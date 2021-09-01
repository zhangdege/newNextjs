import { ChakraProvider } from '@chakra-ui/react'
import { dedupExchange } from '@urql/core'
import { cacheExchange } from '@urql/exchange-graphcache'
import { withUrqlClient } from 'next-urql'
import type { AppProps } from 'next/app'
import { fetchExchange } from 'urql'
// import { devtoolsExchange } from 'urql-devtools'
import { graphqlURL } from '../env'
import '../styles/globals.css'
import { cacheExchangeConfig } from '../utils/cacheExChangeconfig'
/**
 * urql操作
 */
// const client = createClient({
// 	url: graphqlURL,
// 	fetchOptions: { credentials: 'include' as const },
// 	exchanges: [dedupExchange, cacheExchange(cacheExchangeConfig), devtoolsExchange],
// })
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider>
			<Component {...pageProps} />
		</ChakraProvider>
	)
}
// export default MyApp
export default withUrqlClient((ssrExchange) => ({
	url: graphqlURL,
	fetchOptions: { credentials: 'include' as const },
	exchanges: [
		dedupExchange,
		// devtoolsExchange,
		cacheExchange(cacheExchangeConfig),
		ssrExchange,
		fetchExchange,
	],
}))(MyApp)
