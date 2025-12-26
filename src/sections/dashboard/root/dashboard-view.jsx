import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { signOut } from 'src/actions/auth'
import { useAuthContext } from 'src/auth/hooks/use-auth-context'
import { paths } from 'src/router/paths'
import { TranslatedText } from 'src/components/translated-text/translated-text'
import { useTranslation } from 'react-i18next'

export default function DashboardView() {
  const { user, checkUserSession } = useAuthContext()
  const { t } = useTranslation()

  const handleLogout = useCallback(async () => {
        try {
          await signOut();
          await checkUserSession?.();
        } catch (error) {

          throw error
        }
      }, [checkUserSession]);
  return (
    <div className='p-4'>
        <p className='mb-3'><TranslatedText text="Bonjour" /> <strong>{user?.name}</strong> (<TranslatedText text="vous n'êtes pas" /> <strong>{user?.name}</strong> ? <Link onClick={()=>handleLogout()}><TranslatedText text="Déconnexion" /></Link>)</p>
        <p className='mb-3'><TranslatedText text="À partir du tableau de bord de votre compte, vous pouvez :" /></p>
        <ul className='mb-3 list-disc list-inside'>
            <li> <Link to={paths.dashboard.commandes.root}><TranslatedText text="Visualiser vos commandes récentes" /></Link></li>
            <li> <Link to={paths.dashboard.details}><TranslatedText text="Changer votre mot de passe et les détails de votre compte" /></Link></li>
        </ul>
    </div>
  )
}
