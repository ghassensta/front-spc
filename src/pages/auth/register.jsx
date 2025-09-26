import { useSearchParams } from "src/hooks";
import LoginPageView from "src/sections/auth/view/login-page-view";
import RegisterPageView from "src/sections/auth/view/register-page-view";

export default function Page() {
    const searchParams = useSearchParams()

     const code = searchParams.get('code') || '';

  return (
    <>
        <RegisterPageView code={code}/>
    </>
  );
}
