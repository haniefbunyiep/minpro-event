import { usePathname, useRouter } from 'next/navigation';
import { getCookie, getRoleCookie, getEORoleCookie } from './../utils/Cookies';
import { UserContext } from '@/supports/context/userContext';
import { useContext, useEffect } from 'react';
import axios from 'axios';

export default function ProtectedRoute({ children }) {
  const { userData } = useContext(UserContext);
  // console.log(userData);

  const navigate = useRouter();
  const path = usePathname();

  const authorizeUser = async () => {
    let userLocalStorage = localStorage.getItem('usr');
    userLocalStorage = JSON.parse(userLocalStorage);
    // console.log(userLocalStorage?.role);
    const cookie = await getCookie();
    const userCookie = await getRoleCookie();
    const EOCookie = await getEORoleCookie();

    // console.log(userCookie?.value);
    // console.log(userCookie?.value);

    const beforeLogin = ['/dashboard/user', 'dashboard/event-organizer'];
    const protectedPathUserAfterLogin = ['/login/user', '/register/user'];
    const protectedPathEOAfterLogin = [
      '/login/event-organizer',
      '/register/event-organizer',
    ];
    const protectedPathBeforeLogin = ['/use-referral'];

    if (
      (userLocalStorage?.role == '1234') &
      protectedPathUserAfterLogin.includes(path)
    ) {
      navigate.push('/');
    } else if (
      (userLocalStorage?.role == '5678') &
      beforeLogin.includes(path)
    ) {
      navigate.push('/');
    }
  };

  useEffect(() => {
    authorizeUser();
  }, []);

  return <>{children}</>;
}
