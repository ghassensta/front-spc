import React from 'react'
import { Link } from 'react-router-dom'
import { paths } from 'src/router/paths'

export default function DashboardView() {
  return (
    <div className='p-4'>
        <p className='mb-3'>Bonjour <strong>spa-prestige-collection</strong> (vous n’êtes pas <strong>spa-prestige-collection</strong> ? <Link to={paths.main}>Déconnexion</Link>)</p>
        <p className='mb-3'>À partir du tableau de bord de votre compte, vous pouvez visualiser vos <Link to={paths.dashboard.commandes.root}><span className="underline">commandes récentes</span></Link>,  ainsi que <Link to={paths.dashboard.details}><span className="underline">changer votre mot de passe et les détails de votre compte</span></Link>.</p>
    </div>
  )
}
