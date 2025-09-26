import { useState, useEffect, useCallback } from 'react';

// import { useAuthContext } from '../hooks';
import { useRouter, usePathname, useSearchParams } from 'src/hooks';
import { paths } from 'src/router/paths';
import { useAuthContext } from '../hooks/use-auth-context';
import LoadingScreen from 'src/components/loading-screen/loading-screen';
// import { useRouter } from 'src/hooks';

// ----------------------------------------------------------------------

export function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  console.log(pathname)

  const { authenticated, loading, user } = useAuthContext();

  console.log("from auth-guard :", user)
  console.log("Required ", user?.role)

  const [isChecking, setIsChecking] = useState(true);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const checkPermissions = async () => {
    if (loading) return;

    // 🚫 Not authenticated
    if (!authenticated) {
      const signInPath = paths.auth.root
      const href = `${signInPath}?${createQueryString('returnTo', pathname)}`;
      router.replace(href);
      return;
    }
    setIsChecking(false);

   
  };

  useEffect(() => {
    checkPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, loading]);

  if (isChecking) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}