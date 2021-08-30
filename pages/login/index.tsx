import { Button, Input, Wrap, WrapItem } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { useUserLoginMutation } from '../generated/generat'

interface indexProps {}

const index: React.FC<indexProps> = () => {
	const [, sing_in] = useUserLoginMutation()
	const router = useRouter()
	const login = async (user: any) => {
		const options = { phone: '', password: '' }
		options.phone = user.username
		options.password = user.password
		const result = await sing_in(options)
		if (!result.data) {
			alert('登陆失败！')
		} else {
			router.push('/')
		}
	}
	return (
		<Formik
			initialValues={{ username: '', password: '' }}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					login(values)
					setSubmitting(false)
				}, 400)
			}}
		>
			{({
				values,
				errors,
				handleBlur,
				isSubmitting,
				handleSubmit,
				handleChange,
			}) => (
				<Form onSubmit={handleSubmit}>
					<Wrap>
						<WrapItem>
							<Input
								name='username'
								placeholder='用户名'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.username}
							></Input>
						</WrapItem>
						<WrapItem>
							<Input
								name='password'
								placeholder='密码'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.password}
							></Input>
						</WrapItem>
						<WrapItem>
							<Button type='submit' colorScheme='blue' disabled={isSubmitting}>
								登陆
							</Button>
						</WrapItem>
						<WrapItem>
							<Button>重置</Button>
						</WrapItem>
					</Wrap>
				</Form>
			)}
		</Formik>
	)
}

export default index
