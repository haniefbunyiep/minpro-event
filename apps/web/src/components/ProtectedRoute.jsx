import { usePathname, useRouter } from 'next/navigation';
import { getCookie, getRoleCookie, getEORoleCookie } from './../utils/Cookies';
import { UserContext } from '@/supports/context/userContext';
import { useContext, useEffect } from 'react';
import { useGetRole } from './../hooks/useGetRole';

export default function ProtectedRoute({ children }) {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useRouter();
  const path = usePathname();
  // console.log(userData?.role);
  // const { userRole, isLoading } = useGetRole();

  // console.log(userRole?.data.data.role.name);

  const authorizeUser = async () => {
    const cookie = await getCookie();
    const userCookie = await getRoleCookie();
    const EOCookie = await getEORoleCookie();

    const getUserRole = userCookie?.name;
    const getEORole = EOCookie?.name;

    // console.log(getUserRole);
    // console.log(getEORole);

    const dashboardPage = '/dashboard';
    const useReferralPage = '/use-referral';
    const verificationPage = '/verification';
    const transactionPage = '/transaction';
    const loginPage = '/login';
    const registerPage = '/register';

    if (!cookie && path.includes(dashboardPage)) {
      navigate.push('/');
    }

    if (!cookie && path.includes(useReferralPage)) {
      navigate.push('/');
    }

    // if (!cookie && path.includes(verificationPage)) {
    //   navigate.push('/');
    // }

    if (!getUserRole && path.includes(transactionPage)) {
      navigate.push('/');
    }

    if (cookie && path.includes(loginPage)) {
      navigate.push('/');
    }

    if (cookie && path.includes(registerPage)) {
      navigate.push('/');
    }

    // if ((cookie?.name == 'acctkn') & afterUserLogin.includes(path)) {
    //   return navigate.push('/');
    // }
  };

  useEffect(() => {
    authorizeUser();
  }, []);

  return <>{children}</>;
}
