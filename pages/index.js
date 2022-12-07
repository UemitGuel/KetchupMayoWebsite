import { ethers } from "ethers";
import abi from "./utils/KetchupOrMayoPortal.json";
import React, { useEffect, useState } from "react";
import { Container, Text, Button, Heading, Image, Stack, Box, Flex, Spacer, Center, Divider, Tag, TagLabel, StackDivider } from "@chakra-ui/react";


export default function Home(props) {
  const [currentAccount, setCurrentAccount] = useState("");

  const [allToppings, setAllToppings] = useState([]);
  const contractAddress = "0x7bD4Dcc61D051fc11aFF9B7412Ba88d262113672";

  let allToppingsLast = allToppings[allToppings.length - 1];
  /**
   * Create a variable here that references the abi content!
   */
  const contractABI = abi.abi;

  const getAllToppings = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const ketchupOrMayoContract = new ethers.Contract(contractAddress, contractABI, signer);

        /*
         * Call the getAllWaves method from your Smart Contract
         */
        const toppings = await ketchupOrMayoContract.getAllToppings();


        /*
         * We only need address, timestamp, and message in our UI so let's
         * pick those out
         */
        let toppingsCleaned = [];
        toppings.forEach(topping => {
          toppingsCleaned.push({
            address: topping.chose,
            timestamp: new Date(topping.timestamp * 1000),
            message: topping.topping,
            totalKetchup: topping.totalCountKetchup,
            totalMayo: topping.totalCountMayo
          });
        });

        console.log(toppingsCleaned);
        /*
         * Store our data in React State
         */
        setAllToppings(toppingsCleaned);
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
        getAllToppings();
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
  * Implement your connectWallet method here
  */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      getAllToppings();
    } catch (error) {
      console.log(error)
    }
  }

  const ketchupCount = async () => {
    
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const ketchupOrMayoContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await ketchupOrMayoContract.getTotalCountKetchup();
        console.log("Retrieved total ketchup count...", count.toNumber());
        alert("Thanks for voting! :). After your transaction gets through, you have to wait 30 min to vote again");

        /*
* Execute the actual wave from your smart contract
*/
        const choseKetchupTxn = await ketchupOrMayoContract.choseKetchup({ gasLimit: 300000 });
        console.log("Mining...", choseKetchupTxn.hash);

        await choseKetchupTxn.wait();
        console.log("Mined -- ", choseKetchupTxn.hash);

        count = await ketchupOrMayoContract.getTotalCountKetchup();
        console.log("Retrieved total ketchup count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const mayoCount = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const ketchupOrMayoContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await ketchupOrMayoContract.getTotalCountMayo({ gasLimit: 300000 });
        console.log("Retrieved total mayo count...", count.toNumber());
        alert("Thanks for voting! :). After your transaction gets through, you have to wait 30 min to vote again");

        /*
* Execute the actual wave from your smart contract
*/
        const choseMayoTxn = await ketchupOrMayoContract.choseMayo();
        console.log("Mining...", choseMayoTxn.hash);

        await choseMayoTxn.wait();
        console.log("Mined -- ", choseMayoTxn.hash);

        count = await ketchupOrMayoContract.getTotalCountMayo();
        console.log("Retrieved total mayo count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
    getAllToppings();
    let ketchupOrMayoContract;

    const onNewChoice = (from, timestamp, message, totalKetchup, totalMayo) => {
      console.log("NewTopping", from, timestamp, message, totalKetchup, totalMayo);
      setAllToppings(prevState => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message: message,
          totalKetchup: totalKetchup,
          totalMayo: totalMayo
        },
      ]);
    };

    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      ketchupOrMayoContract = new ethers.Contract(contractAddress, contractABI, signer);
      ketchupOrMayoContract.on("NewTopping", onNewChoice);
    }

    return () => {
      if (ketchupOrMayoContract) {
        ketchupOrMayoContract.off("NewTopping", onNewChoice);
      }
    };
  }, [])

  return (
    <Container maxW="container.sm" centerContent>

      <Box maxW='32rem'>
        <Heading mb={4}>Be part of the battle unsettled battle, ketchup vs mayo</Heading>
        <Text fontSize='xl'>
          POV: It´s night, you are out of the club. What a night.. But you are starving. Only one food truck around.
          You can smell fries! YES! Your change in your poket fits perfect for one portion and.. only one topic...
        </Text>
        {!currentAccount && (
          <Button size='lg' colorScheme='green' mt='24px' onClick={connectWallet}>
            Connect your MetaMask Wallet
          </Button>
        )}
      </Box>
      <Flex w='100%'>
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
                src='./ketchup.jpg'
              />
            </Box>
            <Stack align={'center'}>
              <Button size='lg' colorScheme='green' mt='24px' onClick={ketchupCount} loadingText='Transaction in Progress' isDisabled={currentAccount ? false : true}>
                Ketchup, of course!
              </Button>
              {
                allToppingsLast != null &&
                <Tag size='lg' key={'ketchup'} variant='outline' colorScheme='green'>
                  <TagLabel>Total Ketchup: {allToppingsLast.totalKetchup.toString()}</TagLabel>
                </Tag>
              }
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
              <Button size='lg' colorScheme='green' mt='24px' onClick={mayoCount} isDisabled={currentAccount ? false : true}>
                Mayo, obviously!
              </Button>
              {
                allToppingsLast != null &&
                <Tag size='lg' key={'mayo'} variant='outline' colorScheme='green'>
                  <TagLabel>Total Mayo: {allToppingsLast.totalMayo.toString()}</TagLabel>
                </Tag>
              }
            </Stack>
          </Box>
        </Center>
      </Flex>
      <Heading>Who voted how?</Heading>
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
      }
    </Container >
  );
}