import { Box, Button, Input } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import React, { useRef } from 'react'
import {
	useSendtokenMutation,
	useUserPhoneLoginOrregistMutation,
} from '../generated/generat'

interface indexProps {}

const index: React.FC<indexProps> = () => {
	const phone = useRef(null)
	const token = useRef(null)
	const router = useRouter()
	const [, code_sing_in] = useUserPhoneLoginOrregistMutation()
	const [, getToken] = useSendtokenMutation()
	const gToken = () => {
		const phones = { phone: phone.current?.value }
		console.log(phones)

		getToken(phones)
	}
	const login = async () => {
		const user = { phone: phone.current?.value, token: token.current?.value }
		const result = await code_sing_in(user)
		console.log(result)

		if (result.data?.userPhoneLoginOrregist.user) {
			router.push('/')
		} else {
			console.log(result.data)
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
			<Box>
				<Input
					type='text'
					placeholder='验证码'
					ref={token}
					defaultValue=''
					w={100}
					mr={22}
				></Input>
				<Button colorScheme='blue' display={'inline'} onClick={gToken}>
					获取验证码
				</Button>
			</Box>
			<Button colorScheme='blue' mt={15} onClick={login}>
				登陆
			</Button>
			<Button
				ml={19}
				mt={15}
				onClick={() => {
					router.push('/login')
				}}
			>
				密码登陆
			</Button>
		</Box>
	)
}

export default index
