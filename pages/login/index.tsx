import { Box, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useQuery } from 'urql'
import { squery } from '../../env'

interface indexProps {}

const index: React.FC<indexProps> = () => {
	/**
	 * urql操作
	 */

	const [result, reexecuteQuery] = useQuery({
		query: squery,
	})
	const datas = result.data

	/**
	 * end
	 */
	const [name, setName] = useState('你好')
	if (!datas) return <p>...</p>
	const datasa = datas.getAlluser
	console.log(datasa)

	return (
		<Box>
			<Box>{name}</Box>
			<Box>
				{datasa.map(() => {
					return <p key={Math.random()}>hh</p>
				})}
			</Box>
			<Button
				onClick={() => {
					name == '德哥' ? setName('德哥') : setName('你好章三')
				}}
				colorScheme='blue'
			>
				Click
			</Button>
		</Box>
	)
}

export default index
