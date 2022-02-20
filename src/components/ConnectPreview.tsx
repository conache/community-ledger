import React from 'react'
import useWallet from '../hooks/useWallet'

const ConnectPreview = () => {
  const { connectWallet } = useWallet()

  return (
    <div className="w-full max-w-[500px] mx-auto flex-col text-center">
      <div className="flex mb-4 text-2xl">
        Welcome to&nbsp;
        <div className="font-bold">xToken community ledger!</div>
        <div className="ml-4 text-4xl">🎉</div>
      </div>
      <p>
        Now you can inscribe your name and leave a message for other community members.
        <br />
        The cool part is that it will live forever on chain.
      </p>
      <button
        className="p-2 mt-10 text-lg font-bold uppercase bg-blue-light drop-shadow-md"
        onClick={connectWallet}
      >
        Connect wallet
      </button>
    </div>
  )
}

export default ConnectPreview
