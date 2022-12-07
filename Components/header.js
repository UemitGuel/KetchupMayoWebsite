import React from "react";
import {
    VStack,
    HStack,
    Box,
    Tag,
    TagLabel,
    Spacer,
    Link
} from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons'


const Header = () => {
    return (
        <Box
            bg={'neutral.1100'}
            display={{ base: "none", md: "block" }}
            position="fixed"
            w="100%"
            zIndex={99}
            borderBottomWidth="1px"
            borderColor={'neutral.300'}
            shadow="0 0 10px 0 rgba(0,0,0, 0.035);"
        >
            <VStack align="start" spacing={0}>
                <HStack justify="space-between" w="100%" h={16}>
                    <Spacer />
                    <HStack ml={-4} spacing={2} paddingRight={8}>
                        <Spacer />
                        <Tag size={'lg'} key={'lg'} variant='outline' colorScheme='white'>
                            <TagLabel>Görli Testnet</TagLabel>
                        </Tag>
                        <Link href='https://goerli.etherscan.io/address/0x7bd4dcc61d051fc11aff9b7412ba88d262113672' isExternal>
                            See Contract on Etherscan<ExternalLinkIcon mx='2px' />
                        </Link>
                    </HStack>
                </HStack>
            </VStack>
        </Box>
    );
};

export default Header;