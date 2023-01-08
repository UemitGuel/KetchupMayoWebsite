import { ethers } from "ethers";
import abi from "./utils/KetchupOrMayoPortal.json";
import React, { useEffect, useState } from "react";
import { Container, Text, Button, Heading, Image, Stack, Box, Flex, Spacer, Center, Divider, Tag, TagLabel, StackDivider } from "@chakra-ui/react";


export default function Home(props) {
  return (
    <Container maxW="container.sm" centerContent>

        <Heading mb={4}>Fries with Ketchup or Mayo?</Heading>
        <Text fontSize='xl'>
          Let´s settle this.
        </Text>
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
              <Button size='lg' colorScheme='green' mt='24px' loadingText='Transaction in Progress'>
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