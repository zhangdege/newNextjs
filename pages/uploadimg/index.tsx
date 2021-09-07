import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useAddPictureFileMutation } from '../../generated/generat'

interface indexProps {}

const index: React.FC<indexProps> = () => {
	const [files, setFiles] = useState([])
	const [, upload] = useAddPictureFileMutation()
	/**
	 * 后台只有单文件上传方法。这里迭代上传，实现多文件上传
	 * @param data
	 */
	const toUpload = async (data: string | any[] | []) => {
		if (data.length === 1) {
			await upload({ picture: data[0] })
		} else {
			for (let i = 0; i < data.length; i++) {
				await upload({ picture: data[i] })
			}
		}
	}
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: 'image/*',
		onDrop: (acceptedFiles: any) => {
			acceptedFiles.map((file: any) => {
				Object.assign(file, { preview: URL.createObjectURL(file) })
			})
			setFiles(acceptedFiles)
		},
	})
	const thumbs = files.map((file: any) => (
		<div
			style={{
				display: 'inline-flex',
				borderRadius: 2,
				border: '1px solid #eaeaea',
				marginBottom: 8,
				marginRight: 8,
				width: 100,
				height: 100,
				padding: 4,
				boxSizing: 'border-box',
			}}
			key={file.name}
		>
			<div>
				<img src={file.preview} />
			</div>
		</div>
	))
	useEffect(
		() => () => {
			// Make sure to revoke the data uris to avoid memory leaks
			files.forEach((file: any) => URL.revokeObjectURL(file.preview))
		},
		[files]
	)
	return (
		<section className='container'>
			<div
				{...getRootProps({ className: 'dropzone' })}
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
			<aside style={{ display: 'flex', minWidth: 0, overflow: 'hidden' }}>
				{thumbs}
			</aside>
			<button
				style={{
					padding: '15px',
					backgroundColor: 'skyblue',
					margin: '0 auto',
					marginLeft: '15px',
				}}
				onClick={() => {
					toUpload(files)
					files.map((file: any) => {
						console.log(
							`已经上传到这里，请到此处查看：http://localhost:3001/static/images/${file.name}`
						)
					})
				}}
			>
				上传
			</button>
		</section>
	)
}

export default index
