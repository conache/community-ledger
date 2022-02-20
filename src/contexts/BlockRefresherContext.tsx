import React, { useEffect, useRef } from 'react'
import { useReducer } from 'react'
import { getDefaultProvider } from '../utils'

const REFRESH_INTERVAL = 5000

interface IBlockRefreshContext {
  blockNumber: number
  refreshCount: number
}

interface IBlockRefreshState extends IBlockRefreshContext {}

const BlockRefresherContext = React.createContext<IBlockRefreshContext>({
  blockNumber: 0,
  refreshCount: 0
})

// Provides the current blockNumber and  a counter for other hooks to force periodic refresh
const BlockRefresherContextProvider: React.FC = ({ children }) => {
  const previousBlock = useRef(0)
  const [state, setState] = useReducer(
    (prevState: IBlockRefreshState, newState: Partial<IBlockRefreshState>) => ({
      ...prevState,
      ...newState
    }),
    { blockNumber: 0, refreshCount: 0 }
  )

  useEffect(() => {
    const provider = getDefaultProvider()

    const interval = setInterval(async () => {
      const blockNumber = await provider.getBlockNumber()
      if (blockNumber !== previousBlock.current) {
        previousBlock.current = blockNumber
        setState({ blockNumber })
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(async () => {
      setState({ refreshCount: state.refreshCount + 1 })
    }, REFRESH_INTERVAL)
    return () => clearInterval(interval)
  })

  return (
    <BlockRefresherContext.Provider value={state}>
      {children}
    </BlockRefresherContext.Provider>
  )
}

export { BlockRefresherContext, BlockRefresherContextProvider }
