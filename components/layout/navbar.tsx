'use client'

import { useAccount, useDisconnect, useChainId, useSwitchChain } from 'wagmi'
import { useAppKit } from '@reown/appkit/react'
import { baseSepolia } from 'wagmi/chains'

const BASE_SEPOLIA_CHAIN_ID = 84532

export function Navbar() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()
  const { open } = useAppKit()

  const isCorrectNetwork = chainId === BASE_SEPOLIA_CHAIN_ID

  const handleConnect = () => {
    open()
  }

  const handleDisconnect = () => {
    disconnect()
  }

  const handleSwitchNetwork = () => {
    if (switchChain) {
      switchChain({ chainId: BASE_SEPOLIA_CHAIN_ID })
    }
  }

  const formatAddress = (addr: string | undefined) => {
    if (!addr) return ''
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const getNetworkName = () => {
    if (chainId === BASE_SEPOLIA_CHAIN_ID) {
      return 'Base Sepolia'
    }
    return `Chain ${chainId}`
  }

  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-red-600 dark:text-red-500">
              VaultsIQ
            </h1>
          </div>

          {/* Wallet Connection Section */}
          <div className="flex items-center gap-4">
            {isConnected ? (
              <>
                {/* Network Display */}
                <div className="flex items-center gap-2">
                  {isCorrectNetwork ? (
                    <span className="px-3 py-1.5 text-sm font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-200 dark:border-green-800">
                      {getNetworkName()}
                    </span>
                  ) : (
                    <button
                      onClick={handleSwitchNetwork}
                      className="px-3 py-1.5 text-sm font-medium text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                    >
                      Switch to Base Sepolia
                    </button>
                  )}
                </div>

                {/* Address Display */}
                <div className="px-3 py-1.5 text-sm font-mono text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-800">
                  {formatAddress(address)}
                </div>

                {/* Disconnect Button */}
                <button
                  onClick={handleDisconnect}
                  className="px-4 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 rounded-md transition-colors"
                >
                  Disconnect
                </button>
              </>
            ) : (
              <button
                onClick={handleConnect}
                className="px-4 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 rounded-md transition-colors"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

