import { useAccount, useReadContract, useReadContracts } from "wagmi";
import {
  VAULT_FACTORY_ABI,
  VAULT_ABI,
  VAULT_FACTORY_ADDRESS,
} from "@/config/constants";
import { Vault } from "@/types/vault";
import { useEffect, useMemo } from "react";
import { formatEther } from "viem";

export function useVaultFactory() {
  const { address } = useAccount();

  // 1. Fetch user's vault addresses from the factory
  const {
    data: userVaults = [],
    isLoading: isLoadingVaults,
    error: vaultsError,
    refetch: refetchVaults,
  } = useReadContract({
    address: VAULT_FACTORY_ADDRESS,
    abi: VAULT_FACTORY_ABI,
    functionName: "getUserVaults",
    args: [address || "0x0"],
    enabled: !!address,
  });

  // 2. Fetch details for each vault
  const vaultCalls = useMemo(() => {
    if (!userVaults) return [];

    return (userVaults as string[]).map((vaultAddress) => ({
      address: vaultAddress,
      abi: VAULT_ABI,
      functionName: "getVaultInfo" as const,
    }));
  }, [userVaults]);

  const {
    data: vaultsData = [],
    isLoading: isLoadingVaultData,
    error: vaultDataError,
    refetch: refetchVaultData,
  } = useReadContracts({
    contracts: vaultCalls,
    enabled: vaultCalls.length > 0,
  });

  // 3. Transform the data into our Vault type
  const vaults: Vault[] = useMemo(() => {
    if (!vaultsData || !userVaults) return [];

    return (vaultsData as any[])
      .map((data, index) => {
        if (!data?.result) return null;

        const [
          name,
          asset,
          totalAssets,
          totalSupply,
          owner,
          apy,
          protocolAllocations,
          createdAt,
          lastUpdated,
        ] = data.result;

        return {
          address: (userVaults as string[])[index],
          name,
          asset,
          totalAssets,
          totalSupply,
          owner,
          apy: Number(apy) / 100, // Assuming APY is stored as basis points
          protocolAllocations: protocolAllocations.reduce(
            (
              acc: Record<string, number>,
              [protocol, allocation]: [string, bigint]
            ) => {
              acc[protocol] = Number(allocation) / 100; // Convert from basis points to percentage
              return acc;
            },
            {}
          ),
          createdAt: Number(createdAt) * 1000, // Convert to milliseconds
          lastUpdated: Number(lastUpdated) * 1000, // Convert to milliseconds
        };
      })
      .filter(Boolean) as Vault[];
  }, [vaultsData, userVaults]);

  // 4. Calculate aggregate metrics
  const metrics = useMemo(() => {
    if (vaults.length === 0) {
      return {
        totalValue: 0n,
        totalApy: 0,
        vaultCount: 0,
        activeVaults: 0,
      };
    }

    const totalValue = vaults.reduce((sum, v) => sum + v.totalAssets, 0n);
    const totalApy = vaults.reduce((sum, v) => sum + v.apy, 0) / vaults.length;

    return {
      totalValue,
      totalApy,
      vaultCount: vaults.length,
      activeVaults: vaults.filter((v) => v.totalAssets > 0n).length,
    };
  }, [vaults]);

  // 5. Refetch function to refresh all data
  const refetch = async () => {
    await Promise.all([refetchVaults(), refetchVaultData?.()]);
  };

  return {
    vaults,
    metrics,
    isLoading: isLoadingVaults || isLoadingVaultData,
    error: vaultsError || vaultDataError,
    refetch,
  };
}
