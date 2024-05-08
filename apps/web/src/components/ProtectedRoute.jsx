import { usePathname, useRouter } from 'next/navigation';
import { getCookie, getRoleCookie, getEORoleCookie } from './../utils/Cookies';
import { UserContext } from '@/supports/context/userContext';
import { useContext, useEffect } from 'react';
import axios from 'axios';

export default function ProtectedRoute({ children }) {
  const { userData } = useContext(UserContext);
  console.log(userData);

  let userLocalStorage = localStorage.getItem('user');
  console.log(JSON.parse(userLocalStorage));

  const navigate = useRouter();
  const path = usePathname();

  const authorizeUser = async () => {
    const userCookie = await getRoleCookie();
    const EOCookie = await getEORoleCookie();

    console.log(userCookie?.value);
    // console.log(path);

    const beforeLogin = ['/dashboard/user', 'dashboard/event-organizer'];
    const protectedPathUserAfterLogin = ['/login/user', '/register/user'];
    const protectedPathEOAfterLogin = [
      '/login/event-organizer',
      '/register/event-organizer',
    ];
    const protectedPathBeforeLogin = ['/use-referral'];

    // if ((userData?.role == 3) & (path == 'http://localhost:3000/login/user')) {
    //   navigate.push('/');
    // }
    // if (!userData & beforeLogin.includes(path)) {
    //   navigate.push('/');
    // }
  };

  useEffect(() => {
    authorizeUser();
  }, []);

  return <>{children}</>;
}
