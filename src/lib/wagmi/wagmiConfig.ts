import { http, createConfig } from 'wagmi'
import { base, mainnet, optimism, sepolia } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const projectId = '<WALLETCONNECT_PROJECT_ID>';
// const projectId = process.env.WC_PROJECT_ID as string;

export const wagmiConfig = createConfig({
    chains: [mainnet, base],
    ssr: true,
    connectors: [
        injected(),
        walletConnect({ projectId }),
        metaMask(),
        safe(),
    ],
    transports: {
        [mainnet.id]: http(),
        [base.id]: http(),
        [sepolia.id]: http(),
        [optimism.id]: http(),
    },
})