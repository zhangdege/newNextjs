import { ChakraProvider } from '@chakra-ui/react'
import { dedupExchange, subscriptionExchange } from '@urql/core'
import { devtoolsExchange } from '@urql/devtools'
import { cacheExchange } from '@urql/exchange-graphcache'
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch'
import { withUrqlClient } from 'next-urql'
import type { AppProps } from 'next/app'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { errorExchange, fetchExchange } from 'urql'
import ws from 'ws'
import { graphqlURL, NEXT_PUBLIC_SERVER_URL } from '../env'
import '../styles/globals.css'
import { cacheExchangeConfig } from '../utils/cacheExChangeconfig'
import { FronEnderrorExchange } from '../utils/errorExchange'
const wssUrl = NEXT_PUBLIC_SERVER_URL.replace('http', 'ws')
const subscriptionClient = new SubscriptionClient(
	wssUrl,
	{
		reconnect: true,
	},
	process.browser ? undefined : ws
)
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider>
			<Component {...pageProps} />
		</ChakraProvider>
	)
}
export default withUrqlClient((ssrExchange) => ({
	url: graphqlURL,
	fetchOptions: { credentials: 'include' as const },
	exchanges: [
		dedupExchange,
		devtoolsExchange,
		cacheExchange(cacheExchangeConfig),
		multipartFetchExchange,
		errorExchange({
			onError(error) {
				console.error(error)
			},
		}),
		FronEnderrorExchange,
		ssrExchange,
		subscriptionExchange({
			//@ts-ignore
			forwardSubscription(operation) {
				return subscriptionClient.request(operation)
			},
		}),
		fetchExchange,
	],
}))(MyApp)
