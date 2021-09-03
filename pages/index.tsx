import { Box, Button, Input } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import React, { useRef } from 'react'
import {
	useCreatePostsMutation,
	useDeletePostsMutation,
	usePostsQuery,
	useUpdatePostsMutation,
	useUserLogOutMutation,
} from '../generated/generat'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
	const [data] = usePostsQuery()
	const title = useRef(null)
	const router = useRouter()
	const newDatas = data.data?.posts
	const [, sing_out] = useUserLogOutMutation()
	const [, subPosts] = useCreatePostsMutation()
	const [, del] = useDeletePostsMutation()
	const [, updatePosts] = useUpdatePostsMutation()
	// console.log(data)

	const logout = () => {
		sing_out()
	}
	const Posts = () => {
		subPosts({ title: title.current?.value })
	}
	return (
		<Box className={styles.container}>
			<ul>
				{newDatas?.map((posts, index) => {
					return (
						<li key={index}>
							id:{posts.id}-------------------------------title:{posts.title}
						</li>
					)
				})}
			</ul>
			<Button
				onClick={() => {
					router.push('/me')
				}}
				colorScheme={'blue'}
			>
				Me
			</Button>
			<Button onClick={logout} ml={15}>
				Logout
			</Button>
			<Box mt={15}>
				<Input type='text' ref={title}></Input>
				<Button onClick={Posts} mt={15}>
					提交数据
				</Button>
			</Box>
		</Box>
	)
}

export default Home
