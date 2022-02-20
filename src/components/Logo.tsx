import React from 'react'
import { ReactComponent as LogoSVG } from '../assets/logo.svg'

const Logo = () => (
  <div className="flex items-center">
    <LogoSVG />
    <div className="text-3xl uppercase font-bold">Ledger</div>
  </div>
)

export default Logo
