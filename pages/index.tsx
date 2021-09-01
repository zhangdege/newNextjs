import { Box, Button, Input } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import React, { useRef } from 'react'
import {
	useCreatePostsMutation,
	useDeletePostsMutation,
	useMeQuery,
	usePostsQuery,
	useUpdatePostsMutation,
	useUserLogOutMutation,
} from '../generated/generat'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
	const [data] = useMeQuery()
	const [dd] = usePostsQuery()
	const title = useRef(null)
	const router = useRouter()
	const newDatas = data.data?.me?.posts
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
							<Button
								ml={25}
								onClick={() => {
									if (confirm('你确定要删除吗？')) {
										del({ id: posts.id })
									} else {
										alert('取消操作!')
									}
								}}
							>
								删除
							</Button>
							<Button
								ml={15}
								onClick={() => {
									const id = posts.id
									const title: string =
										prompt(`现在：${posts.title}，请输入新的内容`) || posts.title
									updatePosts({ id, title })
								}}
							>
								修改
							</Button>
						</li>
					)
				})}
			</ul>
			<Button
				onClick={() => {
					router.push('/')
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
