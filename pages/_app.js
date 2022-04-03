import { ChakraProvider } from '@chakra-ui/react'
import { Box } from '@chakra-ui/layout'
import theme from "../theme";
import Header from '../Components/header';

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme}>
            <Header />
            <Box as="main" pt={{ base: 16, md: 24 }} pb={{ base: 16, md: 24 }}>
                <Component {...pageProps} />
            </Box>
        </ChakraProvider>
    )
}

export default MyApp