import { Box, Button, Input } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { useUserLoginMutation } from '../generated/generat'

interface PassWordLoginProps {}

export const PassWordLogin: React.FC<PassWordLoginProps> = () => {
	const [, sing_in] = useUserLoginMutation()
	const router = useRouter()
	const login = () => {
		const phone = document.querySelector('#username')?.nodeValue
		const password = document.querySelector('#pwd')?.nodeValue
		console.log(phone, password)
	}
	return (
		<Box>
			<Input type='text' placeholder='用户名' ref='username' id='username'></Input>
			<Input type='password' placeholder='密码' ref='password' id='pwd'></Input>
			<Button onClick={login}>登陆</Button>
		</Box>
	)
}
