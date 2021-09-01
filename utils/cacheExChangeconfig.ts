import { CacheExchangeOpts } from '@urql/exchange-graphcache/dist/types/types'
import {
	CreatePostsMutation,
	DeletePostsMutation,
	MeDocument,
	MeQuery,
} from '../generated/generat'
import { betterUpdateQuery } from './betterUpdateQuery'
export const cacheExchangeConfig: CacheExchangeOpts = {
	updates: {
		Mutation: {
			createPost: (_result, args, cache, info) => {
				betterUpdateQuery<CreatePostsMutation, MeQuery>(
					cache,
					{ query: MeDocument },
					_result,
					(result, query) => {
						console.log({ result, query })
						return query
					}
				)
			},

			deletePost: (_result, args, cache, info) => {
				betterUpdateQuery<DeletePostsMutation, MeQuery>(
					cache,
					{ query: MeDocument },
					_result,
					(result, query) => {
						console.log({ result, query })
						return query
					}
				)
			},
		},
	},
}
