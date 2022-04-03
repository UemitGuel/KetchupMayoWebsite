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
                            <TagLabel>Rinkeby Testnet</TagLabel>
                        </Tag>
                        <Link href='https://rinkeby.etherscan.io/address/0x7B3D2F17bfa2B2d2Ea3Cb2F4494D25bD7291e6EF' isExternal>
                            See Contract on Etherscan<ExternalLinkIcon mx='2px' />
                        </Link>
                    </HStack>
                </HStack>
            </VStack>
        </Box>
    );
};

export default Header;