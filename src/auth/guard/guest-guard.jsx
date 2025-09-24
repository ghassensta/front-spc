import { useState, useEffect } from 'react';

import { paths } from 'src/router/paths';
import { useAuthContext } from '../hooks/use-auth-context';
import { useRouter, useSearchParams } from 'src/hooks';

// ----------------------------------------------------------------------

export function GuestGuard({ children }) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const { loading, authenticated } = useAuthContext();

  const [isChecking, setIsChecking] = useState(true);

  const returnTo = searchParams.get('returnTo') || paths.dashboard.root;

  const checkPermissions = async () => {
    if (loading) {
      return;
    }

    if (authenticated) {
      router.replace(returnTo);
      return;
    }

   

    setIsChecking(false);
  };

  useEffect(() => {
    checkPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, loading]);

  if (isChecking) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}
