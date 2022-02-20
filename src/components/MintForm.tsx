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

interface IMintForm {
  handleFormSubmit: (values: IBrick) => void
}

const MintForm = ({ handleFormSubmit }: IMintForm) => {
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
        .required('Tell others your 2 cents.'),
      fileUrl: Yup.string().required('Image required 🖼')
    }),
    onSubmit: handleFormSubmit
  })

  return (
    <div>
      <div>Mint your own brick</div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Inscribe your name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div>{formik.errors.name}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="message">Tell us a message</label>
          <textarea
            maxLength={100}
            id="message"
            name="message"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
          />
          {formik.touched.message && formik.errors.message ? (
            <div>{formik.errors.message}</div>
          ) : null}
        </div>
        <div>
          <label>Pick a photo</label>
          <FileInput
            id="fileUrl"
            name="fileUrl"
            setFieldValue={formik.setFieldValue}
            setFieldError={formik.setFieldError}
          />
          {formik.errors.fileUrl ? <div>{formik.errors.fileUrl}</div> : null}
        </div>
        <button type="submit" disabled={!(formik.isValid && formik.dirty)}>
          Mint
        </button>
      </form>
    </div>
  )
}

const MintFormContainer = () => {
  const { account } = useWallet()
  const { mintPrice, mintedBricksCount } = usePlarformData()
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

  return <MintForm handleFormSubmit={handleFormSubmit} />
}

export default MintFormContainer
