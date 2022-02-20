import React, { useState } from 'react'
import { useEffect } from 'react'
import constants from '../constants'
import { fullIpfsUrl } from '../utils'

const FILE_MAX_SIZE = 5 * 1000 * 1024 // 5mb

interface IFileInput {
  id: string
  name: string
  setFieldValue: (field: string, value: any) => void
  setFieldError: (field: string, err: string) => void
}

const FileInput = ({ id, name, setFieldValue, setFieldError }: IFileInput) => {
  const [fileUrl, setFileUrl] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [uploadError, setUploadError] = useState<string | unknown>(null)

  useEffect(() => {
    setFieldValue(name, fileUrl)
  }, [fileUrl, name, setFieldValue])

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) {
      return
    }

    if (file.size > FILE_MAX_SIZE) {
      setFieldError(name, 'The image cannot be bigger than 5MB')
      return
    }

    setLoading(true)
    setFieldError(name, '')
    setFileUrl('')
    try {
      const uploaded = await constants.ipfsClient.add(file)
      const url = `${fullIpfsUrl(uploaded.path)}`
      setFileUrl(url)
    } catch (error) {
      setFieldError(name, `${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <input type="file" onChange={onChange} accept="image/*" id={id} name={name} />
      {!loading && fileUrl && (
        <img alt="Your inscribed brick" src={fileUrl} width="200px" />
      )}
      {uploadError}
    </div>
  )
}

export default FileInput
