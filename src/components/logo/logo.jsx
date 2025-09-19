import React from 'react'
import logo from '../../assets/logo.png'

export default function Logo({className}) {
  return (
    <img lazyload="lazy" src={logo} className={className}/>
  )
}
