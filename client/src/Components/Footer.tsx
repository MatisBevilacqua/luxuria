import React from 'react'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className='bg-[#003566] w-full h-[30vh] flex items-center justify-center flex-col'>
      <Logo className='rounded-[99999px] w-[100px] h-[100px] mt-[5vh]'/>
    </footer>
  )
}
