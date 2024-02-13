
import React from 'react'
import HeadingText from './components/HeadingText'
import Navbar from './components/Navbar'
import MainMenu from './components/MainMenu'

const HomePage = () => {
  return (
    <main>
      <MainMenu/>
      <HeadingText title='Veriflow' description='A tracking system for the verification of identiity credentials'/>

    </main>
  )
}

export default HomePage