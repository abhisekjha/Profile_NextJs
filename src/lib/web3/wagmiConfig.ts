import { http, createConfig } from 'wagmi'
import { mainnet, arbitrum, avalanche, base, blast, bsc, gnosis, lightlinkPhoenix, optimism, polygon, scroll, sepolia, zkSync } from 'wagmi/chains'
import { getDefaultConfig } from 'connectkit';

export const wagmiConfig = createConfig(
    getDefaultConfig({
        ssr: true,
        appName: 'App Name',
        walletConnectProjectId: 'YOUR_PROJECT_ID',
        chains: [mainnet, arbitrum, avalanche, base, blast, bsc, gnosis, lightlinkPhoenix, optimism, polygon, scroll, sepolia, zkSync],
        transports: {
            [mainnet.id]: http(),
            [arbitrum.id]: http(),
            [avalanche.id]: http(),
            [base.id]: http(),
            [blast.id]: http(),
            [bsc.id]: http(),
            [gnosis.id]: http(),
            [lightlinkPhoenix.id]: http(),
            [optimism.id]: http(),
            [polygon.id]: http(),
            [scroll.id]: http(),
            [sepolia.id]: http(),
            [zkSync.id]: http(),
        }
    }),
);