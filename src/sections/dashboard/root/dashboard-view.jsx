import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { signOut } from 'src/actions/auth'
import { useAuthContext } from 'src/auth/hooks/use-auth-context'
import { paths } from 'src/router/paths'

export default function DashboardView() {
  const { user, checkUserSession } = useAuthContext()

  const handleLogout = useCallback(async () => {
        try {
          await signOut();
          await checkUserSession?.();
        } catch (error) {
          console.error(error);

          throw error
        }
      }, [checkUserSession]);
  return (
    <div className='p-4'>
        <p className='mb-3'>Bonjour <strong>{user?.name}</strong> (vous n’êtes pas <strong>{user?.name}</strong> ? <Link onClick={()=>handleLogout()}>Déconnexion</Link>)</p>
        <p className='mb-3'>À partir du tableau de bord de votre compte, vous pouvez visualiser vos <Link to={paths.dashboard.commandes.root}><span className="underline">commandes récentes</span></Link>,  ainsi que <Link to={paths.dashboard.details}><span className="underline">changer votre mot de passe et les détails de votre compte</span></Link>.</p>
    </div>
  )
}
