'use client'

import { useAccount, useDisconnect, useChainId, useSwitchChain } from 'wagmi'
import { useAppKit } from '@reown/appkit/react'
import { NETWORK } from '@/config/constants'
import { Logo } from '@/components/logo'

const BASE_SEPOLIA_CHAIN_ID = NETWORK.chainId

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

  const handleSwitchNetwork = async () => {
    if (switchChain) {
      try {
        await switchChain({ chainId: BASE_SEPOLIA_CHAIN_ID })
      } catch (error) {
        console.error('Failed to switch network:', error)
      }
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
    <nav
      className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Logo variant="full" size="md" />
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            <a
              href="/dashboard"
              className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-600 dark:focus:ring-red-500 focus:ring-offset-2 rounded transition-colors"
            >
              Dashboard
            </a>
            <a
              href="/create"
              className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-600 dark:focus:ring-red-500 focus:ring-offset-2 rounded transition-colors"
            >
              Create Vault
            </a>
            <a
              href="/docs"
              className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-600 dark:focus:ring-red-500 focus:ring-offset-2 rounded transition-colors"
            >
              Docs
            </a>
          </nav>

          {/* Wallet Connection Section */}
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap sm:flex-nowrap">
            {isConnected ? (
              <>
                {/* Network Display */}
                <div className="flex items-center gap-2">
                  {isCorrectNetwork ? (
                    <span
                      className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-200 dark:border-green-800"
                      aria-label={`Connected to ${getNetworkName()} network`}
                    >
                      <span className="hidden sm:inline">{getNetworkName()}</span>
                      <span className="sm:hidden">Base</span>
                    </span>
                  ) : (
                    <button
                      onClick={handleSwitchNetwork}
                      aria-label="Switch to Base Sepolia network"
                      className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 focus:outline-none focus:ring-2 focus:ring-red-600 dark:focus:ring-red-500 focus:ring-offset-2 transition-colors"
                    >
                      <span className="hidden sm:inline">Switch to Base Sepolia</span>
                      <span className="sm:hidden">Switch</span>
                    </button>
                  )}
                </div>

                {/* Address Display */}
                <div
                  className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-mono text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-800"
                  aria-label={`Wallet address: ${address}`}
                >
                  {formatAddress(address)}
                </div>

                {/* Disconnect Button */}
                <button
                  onClick={handleDisconnect}
                  aria-label="Disconnect wallet"
                  className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 dark:focus:ring-red-500 focus:ring-offset-2 transition-colors"
                >
                  <span className="hidden sm:inline">Disconnect</span>
                  <span className="sm:hidden">Disc</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleConnect}
                aria-label="Connect wallet"
                className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 dark:focus:ring-red-500 focus:ring-offset-2 transition-colors"
              >
                <span className="hidden sm:inline">Connect Wallet</span>
                <span className="sm:hidden">Connect</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

