import React, { useEffect, useState } from 'react';
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, useToast  } from "native-base";

const Login = (props) => {
    const navigation = props.navigation;
    const [email, setEmail] = useState('munir');
    const [password, setPassword] = useState('123456');
    const toast = useToast();
    const user = { id: 123, email: 'munir', password: '123456' }

    const handleOnSubmit = () =>{
        console.log("email", email, 'password', password);
        if(email == user.email && password == user.password){
            navigation.navigate('Dashboard')
        }
        else{
            toast.show({
                description: "Invalid user name or password!"
              })
        }
    }


    return(
     <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
            <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                color: "warmGray.50"
            }}>
                Welcome
            </Heading>
            <Heading mt="1" _dark={{
                color: "warmGray.200"
            }} color="coolGray.600" fontWeight="medium" size="xs">
                Sign in to continue!
            </Heading>

            <VStack space={3} mt="5">
                <FormControl>
                    <FormControl.Label>Email ID</FormControl.Label>
                    <Input value={email} onChangeText={(email)=> setEmail(email)}/>
                </FormControl>
                <FormControl>
                    <FormControl.Label>Password</FormControl.Label>
                    <Input value={password} type="password" onChangeText={(password)=> setPassword(password)} />
                    <Link _text={{
                        fontSize: "xs",
                        fontWeight: "500",
                        color: "indigo.500"
                    }} alignSelf="flex-end" mt="1">
                        Forget Password?
                    </Link>
                </FormControl>
                <Button mt="2" colorScheme="indigo" onPress={() =>handleOnSubmit()}>
                    Sign in
                </Button>
                <HStack mt="6" justifyContent="center">
                    <Text fontSize="sm" color="coolGray.600" _dark={{
                        color: "warmGray.200"
                    }}>
                        I'm a new user.{" "}
                    </Text>
                    <Link _text={{
                        color: "indigo.500",
                        fontWeight: "medium",
                        fontSize: "sm"
                    }}  >
                        Sign Up
                    </Link>
                </HStack>
            </VStack>
        </Box>
    </Center>
    )
};

export default Login;
