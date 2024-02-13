import {
    Flex,
    Text,
    Image,
    Box,
    SimpleGrid,
    ListItem,
    UnorderedList,
  } from "@chakra-ui/react";


<SimpleGrid columns={2} minChildWidth="500px" placeItems="center" spacing={16}>
  <Box
    m="10px"
    h="500px"
    w="400px"
    mt="40px"
    bgImage="url(./img/cloudy.jpg)"
    bgPosition="bottom"
    borderRadius="2xl"
    shadow="dark-lg"
  >
    <Text
      color="white"
      display="flex"
      justifyContent="center"
      mt="5px"
      fontSize="20px"
    >
      Weather
    </Text>
    <Text color="white" display="flex" justifyContent="center" mt="200px">
      Current Weather
    </Text>
  </Box>

  <Box
    m="10px"
    h="500px"
    w="400px"
    mt="40px"
    bgImage="url(./img/sunshine.jpg)"
    bgPosition="center"
    borderRadius="2xl"
    shadow="dark-lg"
  >
    <Flex wrap="wrap" gap="2" justifyContent="space-around">
      <Box>My city weather</Box>
      <Box>City condition</Box>
    </Flex>
  </Box>
</SimpleGrid>;