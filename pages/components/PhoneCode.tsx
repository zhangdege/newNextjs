import { Box, Button, Input } from '@chakra-ui/react'
import React from 'react'

interface phoneCodeProps {}

export const PhoneCode: React.FC<phoneCodeProps> = () => {
	return (
		<Box>
			<Input type='text' placeholder='手机号'></Input>
			<Input type='text' placeholder='手机验证码'></Input>
			<Button>登陆/注册</Button>
		</Box>
	)
}
