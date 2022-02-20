import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { WalletContextProvider } from './contexts/WalletContext'
import { BlockRefresherContextProvider } from './contexts/BlockRefresherContext'
import { PlatformDataContextProvider } from './contexts/PlatformDataContext'
import { AccountDataContextProvider } from './contexts/AccountDataContext'

ReactDOM.render(
  <React.StrictMode>
    <BlockRefresherContextProvider>
      <WalletContextProvider>
        <PlatformDataContextProvider>
          <AccountDataContextProvider>
            <App />
          </AccountDataContextProvider>
        </PlatformDataContextProvider>
      </WalletContextProvider>
    </BlockRefresherContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
