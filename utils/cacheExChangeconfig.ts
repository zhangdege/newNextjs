import { CacheExchangeOpts } from '@urql/exchange-graphcache/dist/types/types'
import {
	CreatePostsMutation,
	DeletePostsMutation,
	PostsDocument,
	PostsQuery,
} from '../generated/generat'
import { betterUpdateQuery } from './betterUpdateQuery'
export const cacheExchangeConfig: CacheExchangeOpts = {
	updates: {
		Mutation: {
			createPost: (_result, args, cache, info) => {
				betterUpdateQuery<CreatePostsMutation, PostsQuery>(
					cache,
					{ query: PostsDocument },
					_result,
					(result, query) => {
						// console.log({ result, query })

						const { id, title, __typename } = result.createPost
						return { posts: [...query.posts, { id, title, __typename }] }
					}
				)
			},

			deletePost: (_result, args, cache, info) => {
				betterUpdateQuery<DeletePostsMutation, PostsQuery>(
					cache,
					{ query: PostsDocument },
					_result,
					(result, query) => {
						if (!result.deletePost) {
							return query
						}
						const newPostQuery = query.posts.filter((postsItem) => {
							return postsItem.id !== args.id
						})
						return { posts: newPostQuery }
					}
				)
			},
		},
	},
}
