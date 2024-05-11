'use server';
import { cookies } from 'next/headers';

export const setCookie = async (accesstoken, role) => {
  await cookies().set('acctkn', accesstoken);
  await cookies().set('usrl', role);
};

export const setEOCookie = async (accesstoken, role) => {
  await cookies().set('acctkn', accesstoken);
  await cookies().set('esrl', role);
};

export const getCookie = () => {
  return cookies().get('acctkn');
};

export const getRoleCookie = () => {
  return cookies().get('usrl');
};

export const getEORoleCookie = () => {
  return cookies().get('esrl');
};

export const deleteCookie = () => {
  return cookies().delete('acctkn');
};

export const deleteRoleCookie = () => {
  return cookies().delete('usrl');
};

export const deleteEORoleCookie = () => {
  return cookies().delete('esrl');
};
