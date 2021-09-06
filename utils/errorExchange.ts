import Router from 'next/router'
import { Exchange } from 'urql'
import { pipe, tap } from 'wonka'

export const FronEnderrorExchange: Exchange =
	({ forward }) =>
	(ops$) => {
		return pipe(
			forward(ops$),
			tap(({ error }) => {
				if (error?.message.includes('not authenticated')) {
					Router.replace('/login')
				}
			})
		)
	}
