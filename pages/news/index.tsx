import React from 'react'
import { useSubscription } from '../../generated/generat'

interface indexProps {}

const index: React.FC<indexProps> = () => {
	const [data] = useSubscription()
	console.log({ data })

	return <div>信息页面</div>
}

export default index
