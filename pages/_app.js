import { ChakraProvider } from '@chakra-ui/react'
import { Box } from '@chakra-ui/layout'
import theme from "../theme";

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme}>
            <Box as="main" pt={{ base: 16, md: 16 }} pb={{ base: 16, md: 16 }}>
                <Component {...pageProps} />
            </Box>
        </ChakraProvider>
    )
}

export default MyApp