"use client";

import { useState, useEffect } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  VAULT_FACTORY_ADDRESS,
  VAULT_FACTORY_ABI,
  ERC20_ABI,
  SUPPORTED_ASSETS,
} from "@/config/constants";
import { AlertCircle, CheckCircle2, Loader2, ArrowLeft } from "lucide-react";

type TransactionStep = "idle" | "approving" | "creating" | "success" | "error";

export default function CreateVaultPage() {
  const { address, isConnected } = useAccount();
  const router = useRouter();

  // Form state
  const [selectedAsset, setSelectedAsset] = useState(SUPPORTED_ASSETS[0]);
  const [vaultName, setVaultName] = useState("");
  const [vaultSymbol, setVaultSymbol] = useState("");
  const [initialDeposit, setInitialDeposit] = useState("");
  
  // Transaction state
  const [currentStep, setCurrentStep] = useState<TransactionStep>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [createdVaultAddress, setCreatedVaultAddress] = useState<string>("");

  // Check token balance
  const { data: tokenBalance } = useReadContract({
    address: selectedAsset.address,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: [address || "0x0"],
    enabled: !!address,
  });

  // Check current allowance
  const { data: currentAllowance, refetch: refetchAllowance } = useReadContract({
    address: selectedAsset.address,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: [address || "0x0", VAULT_FACTORY_ADDRESS],
    enabled: !!address,
  });

  // Approve token spending
  const {
    writeContract: approveToken,
    data: approveHash,
    isPending: isApprovePending,
  } = useWriteContract();

  const { isLoading: isApproveConfirming, isSuccess: isApproveSuccess } =
    useWaitForTransactionReceipt({
      hash: approveHash,
    });

  // Create vault
  const {
    writeContract: createVault,
    data: createHash,
    isPending: isCreatePending,
  } = useWriteContract();

  const { isLoading: isCreateConfirming, isSuccess: isCreateSuccess } =
    useWaitForTransactionReceipt({
      hash: createHash,
    });

  // Handle approval success
  useEffect(() => {
    if (isApproveSuccess) {
      refetchAllowance();
      handleCreateVault();
    }
  }, [isApproveSuccess]);

  // Handle vault creation success
  useEffect(() => {
    if (isCreateSuccess && createHash) {
      setCurrentStep("success");
      // In a real implementation, you'd parse the transaction receipt to get the vault address
      // For now, we'll redirect to dashboard after a delay
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    }
  }, [isCreateSuccess, createHash, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!isConnected || !address) {
      setErrorMessage("Please connect your wallet");
      return;
    }

    // Validation
    if (!vaultName.trim()) {
      setErrorMessage("Please enter a vault name");
      return;
    }

    if (!vaultSymbol.trim()) {
      setErrorMessage("Please enter a vault symbol");
      return;
    }

    if (!initialDeposit || parseFloat(initialDeposit) <= 0) {
      setErrorMessage("Please enter a valid initial deposit amount");
      return;
    }

    const depositAmount = parseUnits(initialDeposit, selectedAsset.decimals);

    // Check balance
    if (tokenBalance && depositAmount > tokenBalance) {
      setErrorMessage(`Insufficient ${selectedAsset.symbol} balance`);
      return;
    }

    // Check if approval is needed
    if (!currentAllowance || currentAllowance < depositAmount) {
      handleApprove(depositAmount);
    } else {
      handleCreateVault();
    }
  };

  const handleApprove = async (amount: bigint) => {
    try {
      setCurrentStep("approving");
      approveToken({
        address: selectedAsset.address,
        abi: ERC20_ABI,
        functionName: "approve",
        args: [VAULT_FACTORY_ADDRESS, amount],
      });
    } catch (error: any) {
      setCurrentStep("error");
      setErrorMessage(error.message || "Failed to approve token spending");
    }
  };

  const handleCreateVault = async () => {
    try {
      setCurrentStep("creating");
      createVault({
        address: VAULT_FACTORY_ADDRESS,
        abi: VAULT_FACTORY_ABI,
        functionName: "createVault",
        args: [selectedAsset.address, vaultName, vaultSymbol],
      });
    } catch (error: any) {
      setCurrentStep("error");
      setErrorMessage(error.message || "Failed to create vault");
    }
  };

  const isLoading = isApprovePending || isApproveConfirming || isCreatePending || isCreateConfirming;
  const canSubmit = isConnected && !isLoading && currentStep !== "success";

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex min-h-[60vh] flex-col items-center justify-center">
          <AlertCircle className="mb-4 h-12 w-12 text-red-600" />
          <h2 className="mb-4 text-2xl font-bold">Connect Your Wallet</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            Please connect your wallet to create a vault.
          </p>
          <Button onClick={() => router.push("/")}>Go to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Create New Vault</h1>
        <p className="text-muted-foreground">
          Deploy a new ERC-4626 compliant vault for automated yield generation
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Asset Selection */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium">Vault Configuration</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="asset" className="mb-2 block text-sm font-medium">
                  Asset <span className="text-red-600">*</span>
                </label>
                <select
                  id="asset"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-950"
                  value={selectedAsset.symbol}
                  onChange={(e) => {
                    const asset = SUPPORTED_ASSETS.find(a => a.symbol === e.target.value);
                    if (asset) setSelectedAsset(asset);
                  }}
                  disabled={isLoading}
                >
                  {SUPPORTED_ASSETS.map((asset) => (
                    <option key={asset.symbol} value={asset.symbol}>
                      {asset.icon} {asset.name} ({asset.symbol})
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  Select the asset your vault will accept
                </p>
              </div>

              <div>
                <label htmlFor="vaultName" className="mb-2 block text-sm font-medium">
                  Vault Name <span className="text-red-600">*</span>
                </label>
                <Input
                  id="vaultName"
                  placeholder="e.g., My USDC Vault"
                  value={vaultName}
                  onChange={(e) => setVaultName(e.target.value)}
                  disabled={isLoading}
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  A descriptive name for your vault
                </p>
              </div>

              <div>
                <label htmlFor="vaultSymbol" className="mb-2 block text-sm font-medium">
                  Vault Symbol <span className="text-red-600">*</span>
                </label>
                <Input
                  id="vaultSymbol"
                  placeholder="e.g., vUSDC"
                  value={vaultSymbol}
                  onChange={(e) => setVaultSymbol(e.target.value.toUpperCase())}
                  disabled={isLoading}
                  required
                  maxLength={10}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Symbol for your vault shares (max 10 characters)
                </p>
              </div>

              <div>
                <label htmlFor="initialDeposit" className="mb-2 block text-sm font-medium">
                  Initial Deposit <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Input
                    id="initialDeposit"
                    type="number"
                    step="any"
                    min="0"
                    placeholder="0.00"
                    value={initialDeposit}
                    onChange={(e) => setInitialDeposit(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    {selectedAsset.symbol}
                  </span>
                </div>
                {tokenBalance && (
                  <p className="mt-1 text-xs text-gray-500">
                    Balance: {formatUnits(tokenBalance, selectedAsset.decimals)} {selectedAsset.symbol}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Transaction Status */}
          {currentStep !== "idle" && (
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-medium">Transaction Status</h3>
              
              <div className="space-y-3">
                {/* Approval Step */}
                <div className="flex items-center gap-3">
                  {currentStep === "approving" ? (
                    <Loader2 className="h-5 w-5 animate-spin text-red-600" />
                  ) : isApproveSuccess ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                  )}
                  <span className={isApproveSuccess ? "text-green-600" : ""}>
                    Approve {selectedAsset.symbol} spending
                  </span>
                </div>

                {/* Creation Step */}
                <div className="flex items-center gap-3">
                  {currentStep === "creating" ? (
                    <Loader2 className="h-5 w-5 animate-spin text-red-600" />
                  ) : isCreateSuccess ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                  )}
                  <span className={isCreateSuccess ? "text-green-600" : ""}>
                    Create vault
                  </span>
                </div>
              </div>

              {currentStep === "success" && (
                <div className="mt-4 rounded-md bg-green-50 p-4 dark:bg-green-950">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">
                      Vault created successfully! Redirecting to dashboard...
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="rounded-md bg-red-50 p-4 dark:bg-red-950">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <p className="text-sm font-medium text-red-800 dark:text-red-200">
                  {errorMessage}
                </p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard")}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!canSubmit}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {currentStep === "approving" && "Approving..."}
                  {currentStep === "creating" && "Creating Vault..."}
                </>
              ) : (
                "Create Vault"
              )}
            </Button>
          </div>
        </form>

        {/* Info Box */}
        <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950">
          <h4 className="mb-2 font-medium text-blue-900 dark:text-blue-100">
            ℹ️ What happens when you create a vault?
          </h4>
          <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
            <li>• A new ERC-4626 compliant vault contract is deployed</li>
            <li>• You become the owner of the vault</li>
            <li>• Your initial deposit is converted to vault shares</li>
            <li>• You can configure protocol allocations after creation</li>
            <li>• Vault shares are transferable ERC-20 tokens</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
