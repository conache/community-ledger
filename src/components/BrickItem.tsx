import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

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
      {brickDetails ? (
        <div>
          <div>#{id}</div>
          <img alt="Brick" src={brickDetails?.fileUrl} width="260" />
          <div>
            Name: {brickDetails.name} ({ownerAddress})
          </div>
          <div>MessagE: {brickDetails.message}</div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  )
}

export default BrickItem
