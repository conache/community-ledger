import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { prettifyAccountAddress } from '../utils'
import LoadingText from './LoadingText'

export interface IBrick {
  name: string
  message: string
  fileUrl: string
}

export interface IBrickItemData {
  id: number
  uri: string
  ownerAddress: string
}

const BrickItem = ({ uri, id, ownerAddress }: IBrickItemData) => {
  const [brickDetails, setBrickDetails] = useState<IBrick>()

  useEffect(() => {
    fetch(uri)
      .then((res) => res.json())
      .then((res) => setBrickDetails(res as IBrick))
  }, [uri])

  return (
    <div>
      <div className="w-[320px] h-[400px] bg-blue-dark shadow-bottom-left rounded-lg flex flex-col">
        {brickDetails ? (
          <>
            <img
              alt="Brick"
              src={brickDetails?.fileUrl}
              className="w-full h-[50%] object-cover rounded-t-lg"
            />
            <div
              className="flex flex-col w-full gap-2 p-4"
              style={{ overflowWrap: 'break-word' }}
            >
              <div className="text-lg font-bold">xBrick #{id}</div>
              <div className="flex">
                <div className="mr-2 font-bold">Name:</div> {brickDetails.name} (
                {prettifyAccountAddress(ownerAddress)})
              </div>
              <div className="flex flex-col">
                <div className="font-bold">Message:</div>
                <p className="max-h-[80px] overflow-auto">{brickDetails.message}</p>
              </div>
            </div>
          </>
        ) : (
          <LoadingText />
        )}
      </div>
    </div>
  )
}

export default BrickItem
