import { Box, Button, Input } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import React, { useRef } from 'react'
import { useUserLoginMutation } from '../generated/generat'

interface indexProps {}

const index: React.FC<indexProps> = () => {
	const phone = useRef(null)
	const password = useRef(null)
	const router = useRouter()
	const [, sing_in] = useUserLoginMutation()
	const login = async () => {
		const user = { phone: phone.current?.value, password: password.current?.value }
		const result = await sing_in(user)
		console.log(result)

		if (result.data?.userLogin.user) {
			router.push('/')
		} else {
			alert(result.data?.userLogin.errors?.message)
		}
	}
	return (
		<Box h={300} w={300} margin={'auto'} mt={300}>
			<Input
				type='text'
				placeholder='用户名'
				id='username'
				ref={phone}
				defaultValue=''
				mb={15}
			></Input>
			<Input
				type='password'
				placeholder='密码'
				id='pwd'
				ref={password}
				defaultValue=''
				mb={15}
			></Input>
			<Button colorScheme='blue' onClick={login}>
				登陆
			</Button>
			<Button
				ml={15}
				onClick={() => {
					router.push('/phoneLogin')
				}}
			>
				验证码
			</Button>
		</Box>
	)
}

export default index
