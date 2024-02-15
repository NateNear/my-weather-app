import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { auth } from './firebase-auth/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SimpleCard() {
  const router = useRouter();
    const [showPassword, setShowPassword] = useState(false)
  
    const [values, setValues] = useState({
      first_name: "",
      last_name: "",
      email: "",
      pass: "",
    });
  
    const handleSubmission = ()=> {
      signInWithEmailAndPassword(auth, values.email, values.pass)
          .then(async(res)=> {
              console.log(res);
            //   const user = res.user;
            //   await updateProfile(user, {
            //       displayName: values.last_name,
            //   });
            router.push('/');
          })
          .catch((err) => console.log("Error-", err));
      console.log(values);
    }
  


  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'2rem'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <span color={'blue.400'}>features</span> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input 
              type="email"
              onChange = {(e)=> 
                setValues((prev)=>({ ...prev, email: e.target.value}))} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input 
                type={showPassword ? 'text' : 'password'}
                onChange = {(e)=> 
                    setValues((prev)=>({ ...prev, pass: e.target.value}))} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Text align={'center'}>
                New user? <Link href="/signUp" passHref>SignUp</Link>
              </Text>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick = {handleSubmission}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}