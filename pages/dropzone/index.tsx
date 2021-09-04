import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useAddpictureFileMutation } from '../../generated/generat'

interface indexProps {}

const index: React.FC<indexProps> = () => {
	const [, upload] = useAddpictureFileMutation()
	const onDrop = useCallback(async (acceptedFiles) => {
		// acceptedFiles.forEach((file: Blob) => {
		// 	const reader = new FileReader()

		// 	reader.onabort = () => console.log('file reading was aborted')
		// 	reader.onerror = () => console.log('file reading has failed')
		// 	reader.onload = () => {
		// 		// Do whatever you want with the file contents
		// 		const binaryStr = reader.result
		// 		console.log(binaryStr)
		// 	}
		// 	reader.readAsArrayBuffer(file)

		// })
		console.log(acceptedFiles[0])
		await upload({ picture: acceptedFiles[0] })
	}, [])
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

	return (
		<div {...getRootProps()}>
			<input {...getInputProps()} />
			{isDragActive ? (
				<p>Drop the files here ...</p>
			) : (
				<p>Drag 'n' drop some files here, or click to select files</p>
			)}
		</div>
	)
}

export default index
