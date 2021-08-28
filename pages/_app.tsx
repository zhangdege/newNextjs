import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { createClient, Provider } from 'urql'
import { graphqlURL } from '../env'
import '../styles/globals.css'
/**
 * urql操作
 */
const client = createClient({
	url: graphqlURL,
})
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider value={client}>
			<ChakraProvider>
				<Component {...pageProps} />
			</ChakraProvider>
		</Provider>
	)
}
export default MyApp
