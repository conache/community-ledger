import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import FileInput from './FileInput'
import constants from '../constants'
import { fullIpfsUrl } from '../utils'
import { useLedgerContract, useTokenContract } from '../hooks/useContract'
import usePlarformData from '../hooks/usePlatformData'
import useWallet from '../hooks/useWallet'
import { IBrick } from './BrickItem'
import Button from './Button'
import useAccountData from '../hooks/useAccountData'
import { useEffect } from 'react'
import { useState } from 'react'

interface IMintForm {
  hasEnoughTokens: boolean
  handleFormSubmit: (values: IBrick) => void
}

const MintForm = ({ hasEnoughTokens, handleFormSubmit }: IMintForm) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      message: '',
      fileUrl: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name required on the brick 🤷🏼‍♂️'),
      message: Yup.string()
        .max(100, 'Too many words 💬')
        .required('You surely have a message to say.'),
      fileUrl: Yup.string().required('Image required 🖼')
    }),
    onSubmit: handleFormSubmit
  })
  const inputComponentStyle = 'flex flex-col mb-4'
  const inputFieldStyle = `rounded p-2 bg-white/25`
  const labelStyle = 'font-bold text-sm'
  const errorStyle = 'text-sm text-error'

  return (
    <div className="w-fit max-w-[400px]">
      <div className="mb-4 text-2xl font-bold text-center">Mint your own brick</div>
      {!hasEnoughTokens && (
        <div className={`${errorStyle} mb-2`}>
          Unfortunately, you don't have enough XYZ to mint.
        </div>
      )}
      <form onSubmit={formik.handleSubmit}>
        <div className={inputComponentStyle}>
          <label htmlFor="name" className={labelStyle}>
            Inscribe your name
          </label>
          <input
            className={inputFieldStyle}
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className={errorStyle}>{formik.errors.name}</div>
          ) : null}
        </div>
        <div className={inputComponentStyle}>
          <label htmlFor="message" className={labelStyle}>
            Tell all a message
          </label>
          <textarea
            className={inputFieldStyle}
            maxLength={100}
            id="message"
            name="message"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
          />
          {formik.touched.message && formik.errors.message ? (
            <div className={errorStyle}>{formik.errors.message}</div>
          ) : null}
        </div>
        <div className={inputComponentStyle}>
          <label htmlFor="message" className={labelStyle}>
            Pick a photo
          </label>
          <FileInput
            id="fileUrl"
            name="fileUrl"
            setFieldValue={formik.setFieldValue}
            setFieldError={formik.setFieldError}
          />
          {formik.errors.fileUrl ? (
            <div className={errorStyle}>{formik.errors.fileUrl}</div>
          ) : null}
        </div>
        <Button
          type="submit"
          disabled={!(formik.isValid && formik.dirty && hasEnoughTokens)}
          className={'w-full mt-4'}
        >
          Mint
        </Button>
      </form>
    </div>
  )
}

const MintFormContainer = () => {
  const [hasEnoughTokens, setHasEnoughTokens] = useState(false)

  const { account } = useWallet()
  const { mintPrice, mintedBricksCount } = usePlarformData()
  const { tokenBalance } = useAccountData()

  const tokenContract = useTokenContract()
  const ledgerContract = useLedgerContract()

  const handleFormSubmit = async (values: IBrick) => {
    const uploaded = await constants.ipfsClient.add(JSON.stringify(values))
    const ipfsUrl = `${fullIpfsUrl(uploaded.path)}`
    const currentAllowance = await tokenContract.allowance(
      account,
      ledgerContract.address
    )

    await tokenContract.approve(ledgerContract.address, mintPrice)
    await ledgerContract.mint(ipfsUrl)
  }

  useEffect(() => {
    const checkHasTokens = async () => {
      setHasEnoughTokens(await tokenBalance.gte(mintPrice))
    }

    checkHasTokens()
  }, [mintPrice, tokenBalance])

  return (
    <div className="flex justify-center">
      <MintForm handleFormSubmit={handleFormSubmit} hasEnoughTokens={hasEnoughTokens} />
    </div>
  )
}

export default MintFormContainer
