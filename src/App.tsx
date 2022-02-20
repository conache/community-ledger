import React from 'react'
import TopNav from './components/TopNav'
import Hero from './components/Hero'
import MintedBricksList from './components/MintedBricksList'
import ProgressBanner from './components/ProgressBanner'

const App = () => {
  return (
    <>
      <TopNav />
      <ProgressBanner />
      <div className="min-h-[400px] flex flex-col justify-center max-w-[1400px] mx-auto px-6">
        <Hero />
      </div>
      <MintedBricksList />
    </>
  )
}

export default App
