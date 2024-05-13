import { usePathname, useRouter } from 'next/navigation';
import { getCookie, getRoleCookie, getEORoleCookie } from './../utils/Cookies';
import { UserContext } from '@/supports/context/userContext';
import { useContext, useEffect } from 'react';
import { useGetRole } from './../hooks/useGetRole';

export default function ProtectedRoute({ children }) {
  const navigate = useRouter();
  const path = usePathname();
  // const { userRole, isLoading } = useGetRole();

  // console.log(userRole?.data.data.role.name);

  const authorizeUser = async () => {
    const cookie = await getCookie();
    const userCookie = await getRoleCookie();
    const EOCookie = await getEORoleCookie();

    const beforeLogin = [
      '/dashboard/user',
      '/dashboard/event-organizer',
      '/use-referral',
    ];

    const afterUserLogin = ['/login/user', '/login/event-organizer'];

    const loginAsUser = [
      '/dashboard/event-organizer',
      '/login/user',
      '/register/user',
    ];
    const loginAsEO = ['/dashboard/user'];

    // if (
    //   (userRole?.data?.data?.role?.name == 'User') &
    //   afterUserLogin.includes(path)
    // ) {
    //   return await navigate.push('/');
    // }

    // if ((cookie?.name == 'acctkn') & afterUserLogin.includes(path)) {
    //   return navigate.push('/');
    // }
  };

  useEffect(() => {
    authorizeUser();
  }, []);

  return <>{children}</>;
}
