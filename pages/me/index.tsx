import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import {
	useDeletePostsMutation,
	useMeQuery,
	usePostsQuery,
	useUpdatePostsMutation,
} from '../../generated/generat'

interface indexProps {}

const index: React.FC<indexProps> = () => {
	const [{ data }] = usePostsQuery()
	const [{ data: medata }] = useMeQuery()

	const router = useRouter()
	const [, del] = useDeletePostsMutation()
	const [, updatePosts] = useUpdatePostsMutation()
	if (!data && !medata) {
		return <div>wating...</div>
	}
	const mePosts = data?.posts.filter((po) => {
		return po.creator.id === medata?.me?.id
	})
	console.log('ssss', mePosts)
	return (
		<div>
			我的数据:
			<ul>
				{mePosts?.map((posts) => {
					return (
						<li key={posts.id}>
							id:{posts.id}-------------------------------------------title:
							{posts.title}
							<Button
								onClick={() => {
									if (confirm('删除?')) {
										del({ id: posts.id })
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
					if (confirm('回首页？')) {
						router.push('/')
					}
				}}
			>
				返回首页
			</Button>
		</div>
	)
}

export default index
