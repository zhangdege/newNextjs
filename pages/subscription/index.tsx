import React from 'react'
import { useSubscription } from '../../generated/generat'

interface indexProps {}

const index: React.FC<indexProps> = () => {
	const [data] = useSubscription()
	console.log({ data })

	return <div>请打开console去查看subscription</div>
}

export default index
