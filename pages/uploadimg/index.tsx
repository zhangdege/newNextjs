import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useAddpictureFileMutation } from '../../generated/generat'

interface indexProps {}

const index: React.FC<indexProps> = () => {
	const [, upload] = useAddpictureFileMutation()
	const onDrop = useCallback(async (acceptedFiles) => {
		await upload({ picture: acceptedFiles[0] })
	}, [])
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: ['image/jpeg', 'image/png'],
	})
	return (
		<div
			{...getRootProps()}
			style={{
				width: '500px',
				height: '300px',
				margin: '0 auto',
				marginTop: '50px',
				border: '1px solid green',
				textAlign: 'center',
				lineHeight: '300px',
			}}
		>
			<input {...getInputProps()} />
			{isDragActive ? (
				<p>请拉取jpg/png文件到此处！</p>
			) : (
				<p>请拉取jpg/png文件到此处或者点击此处上传！</p>
			)}
		</div>
	)
}

export default index
