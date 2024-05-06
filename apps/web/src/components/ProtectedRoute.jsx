import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getCookie } from './../utils/Cookies';

export default function ProtectedRoute({ children }) {
  const navigate = useRouter();
  const path = usePathname();

  const authorizeUser = async () => {
    const cookie = await getCookie();

    const protectedPathAfterLogin = ['/login', '/register'];
    const protectedPathBeforeLogin = ['/use-referral'];

    if (!cookie & protectedPathBeforeLogin.includes(path)) {
      navigate.push('/');
    }

    if (cookie && protectedPathAfterLogin.includes(path)) {
      navigate.push('/');
    }
  };

  useEffect(() => {
    authorizeUser();
  }, []);

  return <>{children}</>;
}
