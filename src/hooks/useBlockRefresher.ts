import { useContext } from 'react'
import { BlockRefresherContext } from '../contexts/BlockRefresherContext'

const useBlockRefresher = () => useContext(BlockRefresherContext)

export default useBlockRefresher
