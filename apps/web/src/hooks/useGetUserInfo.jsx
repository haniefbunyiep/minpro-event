import { useEffect, useState } from 'react';
import { useGetUserInfoQuery } from '@/api/useGetUserInfoMutation';

export const useGetUserInfo = () => {
  const { data: userInfo, isLoading, error } = useGetUserInfoQuery();

  return { userInfo, isLoading, error };
};
