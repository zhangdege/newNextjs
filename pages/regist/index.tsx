import { Button, Input, Wrap, WrapItem } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { useCreateUserMutation } from '../../generated/generat'
interface indexProps {}

const index: React.FC<indexProps> = () => {
	const [, sing_up] = useCreateUserMutation()
	const router = useRouter()
	const regist = async (user: any) => {
		if (user.password !== user.confirmPassword) {
			alert('请确认两次密码一致！')
			return
		}
		const option = { phone: '', password: '' }
		option.phone = user.username
		option.password = user.password
		let result = await sing_up(option)

		if (!result.data) {
			alert('注册失败！')
		} else {
			router.push('/login')
		}
	}
	return (
		<Formik
			initialValues={{ username: '', password: '', confirmPassword: '' }}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					regist(values)
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
							<Input
								name='confirmPassword'
								placeholder='确认密码'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.confirmPassword}
							></Input>
						</WrapItem>
						<WrapItem>
							{values.password !== values.confirmPassword ? 'Err!' : ''}
						</WrapItem>
						<WrapItem>
							<Button type='submit' colorScheme='blue' disabled={isSubmitting}>
								注册
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
