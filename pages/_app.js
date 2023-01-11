import { ChakraProvider } from '@chakra-ui/react'
import { Box } from '@chakra-ui/layout'
import theme from "../theme";
import Header from '../Components/header';
import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultWallets,
    RainbowKitProvider
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { goerli } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';

const { chains, provider } = configureChains(
    [goerli],
    [
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID ?? "" }),
    ]
);
const { connectors } = getDefaultWallets({
    appName: 'Ketchup or Mayo?',
    chains
});
const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
})

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme}>
            <WagmiConfig client={wagmiClient}>
                <RainbowKitProvider chains={chains}>
                    <Header />
                    <Box as="main" pt={{ base: 16, md: 24 }} pb={{ base: 16, md: 24 }}>
                        <Component {...pageProps} />
                    </Box>
                </RainbowKitProvider>
            </WagmiConfig>
        </ChakraProvider>
    )
}

export default MyApp