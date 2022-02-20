import { useContext } from 'react'
import { AccountDataContext } from '../contexts/AccountDataContext'

const useAccountData = () => useContext(AccountDataContext)

export default useAccountData
