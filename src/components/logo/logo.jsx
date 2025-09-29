import React from 'react'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { paths } from 'src/router/paths'

export default function Logo({className}) {
  return (
    <Link to={paths.main}><img lazyload="lazy" src={logo} className={className}/></Link>
  )
}
