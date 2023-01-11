import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import React, { useEffect, useState } from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import abi from "./utils/KetchupOrMayoPortal.json";
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { Container, Text, Button, Heading, Image, Stack, Box, Flex, Spacer, Center, Divider, Tag, TagLabel, StackDivider } from "@chakra-ui/react";


export default function Home(props) {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  const contractConfig = {
    address: '0x3e609d33c73559d9e2030e3ddeC8EB731e2eB31C',
    abi,
  };

  const { config: voteKetchupConfig } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'voteKetchup'
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(voteKetchupConfig)

  const { config: voteMayoConfig } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'voteMayo'
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(voteMayoConfig)


  return (
    <Container maxW="container.sm" centerContent>
       <ConnectButton />
      <Heading mb={4} pt={8}>Fries with Ketchup or Mayo?</Heading>
        <Text fontSize='xl'>
          Let´s settle this.
        </Text>
      <Flex w='100%'>
        <Center py={8}>
          <Box
            role={'group'}
            p={6}
            maxW={'330px'}
            w={'full'}
            rounded={'lg'}
            pos={'relative'}
            zIndex={1}>
            <Box
              rounded={'lg'}
              mt={-12}
              pos={'relative'}
              height={'230px'}
              _after={{
                transition: 'all .3s ease',
                content: '""',
                w: 'full',
                h: 'full',
                pos: 'absolute',
                top: 5,
                left: 0,
                // backgroundImage: `url(${IMAGE})`,
                filter: 'blur(15px)',
                zIndex: -1,
              }}
              _groupHover={{
                _after: {
                  filter: 'blur(20px)',
                },
              }}>
              <Image
                rounded={'lg'}
                height={230}
                width={282}
                objectFit={'cover'}
                src='./ketchup.jpg'
              />
            </Box>
            <Stack align={'center'}>
              <Button size='lg' colorScheme='green' mt='24px' loadingText='Transaction in Progress' disabled={!write} onClick={() => write?.()}>
                Ketchup, of course!
              </Button>
            </Stack>
          </Box>
        </Center>

        <Center py={12}>
          <Box
            role={'group'}
            p={6}
            maxW={'330px'}
            w={'full'}
            rounded={'lg'}
            pos={'relative'}
            zIndex={1}>
            <Box

              rounded={'lg'}
              mt={-12}
              pos={'relative'}
              height={'230px'}
              _after={{
                transition: 'all .3s ease',
                content: '""',
                w: 'full',
                h: 'full',
                pos: 'absolute',
                top: 5,
                left: 0,
                // backgroundImage: `url(${IMAGE})`,
                filter: 'blur(15px)',
                zIndex: -1,
              }}
              _groupHover={{
                _after: {
                  filter: 'blur(20px)',
                },
              }}>
              <Image
                rounded={'lg'}
                height={230}
                width={282}
                objectFit={'cover'}
                src='./mayo.jpg'
              />
            </Box>
            <Stack align={'center'}>
              <Button size='lg' colorScheme='green' mt='24px'>
                Mayo, obviously!
              </Button>
            </Stack>
          </Box>
        </Center>
      </Flex>
      <div>
        <button disabled={!write} onClick={() => write?.()}>
          Feed
        </button>
        {isLoading && <div>Check Wallet</div>}
        {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
      </div>
      {/* <Heading>Who voted how?</Heading>
      <Divider />
      {
        allToppings.reverse().map((topping, index) => {
          return (
            <Stack>
              <Text>Address: {topping.address}</Text>
              <Text>Time: {topping.timestamp.toString()}</Text>
              <Text>Message: {topping.message}</Text>
              <Text>Total Ketchup: {topping.totalKetchup.toString()}</Text>
              <Text>Total Mayo: {topping.totalMayo.toString()}</Text>
              <Divider />
            </Stack>
          )
        })
      } */}
    </Container >
  );
}