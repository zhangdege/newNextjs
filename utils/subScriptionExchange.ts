// import { createClient as createWSClient } from 'graphql-ws'
// /**
//  * 这里需要 判断是否是浏览器，websoket需要在浏览器运行
//  * 在Next.js中有两端渲染
//  */
// const wsClient = process.browser
// 	? createWSClient({
// 			url: 'ws://localhost:3001/graphql',
// 	  })
// 	: null

import { SubscriptionClient } from 'subscriptions-transport-ws'
import ws from 'ws'
import { NEXT_PUBLIC_SERVER_URL } from '../env'

// export default wsClient
const wssUrl = NEXT_PUBLIC_SERVER_URL.replace('http', 'ws')
const subscriptionClient = new SubscriptionClient(
	wssUrl,
	{
		reconnect: true,
	},
	process.browser ? undefined : ws
)
export default subscriptionClient
