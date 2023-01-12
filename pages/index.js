import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import React, { useEffect, useState } from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import abi from "./utils/KetchupOrMayoPortal.json";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { watchContractEvent, readContract } from '@wagmi/core'
import { Container, Link, Alert, AlertIcon, Text, Button, Heading, Image, Stack, Box, Flex, Spacer, Center, Divider, Tag, TagLabel, StackDivider } from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons'

export default function Home(props) {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  const [ketchupCount, setKetchupCount] = useState(0);
  const [mayoCount, setMayoCount] = useState(0);

  const contractConfig = {
    address: '0x3e609d33c73559d9e2030e3ddeC8EB731e2eB31C',
    abi,
  };

  const { config } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'voteKetchup'
  })
  const { data: dataK, isLoading: isLoadingK, isSuccess: isSuccessK, write: writeK } = useContractWrite(config)

  const { config: configM } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'voteMayo'
  })
  const { data: dataM, isLoading: isLoadingM, isSuccess: isSuccessM, write: writeM } = useContractWrite(configM)

  // const unListenToNewVotes = watchContractEvent({
  //   ...contractConfig,
  //   eventName: 'VoteHasHappend'
  // },
  //   () => {
  //     console.log("VoteHasHappend");
  //     getVoteCounts();
  //   },
  // )

  const getVoteCounts = async () => {
    try {
      const ketchupBN = await readContract({
        ...contractConfig,
        functionName: 'ketchupCount',
      })

      const mayoBN = await readContract({
        ...contractConfig,
        functionName: 'mayoCount',
      })

      const ketchupInt = ketchupBN.toNumber();
      const mayoInt = mayoBN.toNumber();
      console.log(ketchupInt);
      console.log(mayoInt);
      setKetchupCount(ketchupBN.toNumber());
      setMayoCount(mayoBN.toNumber());
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log("huhudehduhedhe");
    getVoteCounts();
  }, [])

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
              <Button isLoading={isLoadingK} size='lg' colorScheme='green' mt='24px' loadingText='Check Wallet' disabled={isLoadingK} onClick={() => writeK?.()}>
                Ketchup, of course!
              </Button>
              <Tag size='lg' key={'ketchup'} variant='outline' colorScheme='green'>
                <TagLabel>Total Ketchup: {ketchupCount}</TagLabel>
              </Tag>
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
              <Button isLoading={isLoadingM} size='lg' colorScheme='green' mt='24px' loadingText='Check Wallet' disabled={isLoadingM} onClick={() => writeM?.()}>
                Mayo, obviously!
              </Button>
              <Tag size='lg' key={'mayo'} variant='outline' colorScheme='green'>
                <TagLabel>Total Mayo: {mayoCount}</TagLabel>
              </Tag>
            </Stack>
          </Box>
        </Center>
      </Flex>
      {isSuccessK &&
        <Link href={`https://goerli.etherscan.io/tx/` + dataK.hash} isExternal>
          <Alert status='success' variant='solid'>
            <AlertIcon />
            Transaction submitted! Check the status on Etherscan<ExternalLinkIcon mx='2px' />
          </Alert>
        </Link>}
      {isSuccessM &&
        <Link href={`https://goerli.etherscan.io/tx/` + dataM.hash} isExternal>
          <Alert status='success' variant='solid'>
            <AlertIcon />
            Transaction submitted! Check the status on Etherscan<ExternalLinkIcon mx='2px' />
          </Alert>
        </Link>}
      {/* <button disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send'}
      </button>
      {isSuccess && (
        <div>
          Successfully sent  ether to 
          <div>
            <a href={`https://etherscan.io/tx/${dataK?.hash}`}>Etherscan</a>
          </div>
        </div>
      )} */}
      {/* <div>
        <button disabled={!writeM} onClick={() => writeM?.()}>
          Feed
        </button>
        {isLoading && <div>Check Wallet</div>}
        {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
      </div> */}
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