import { useEffect, useState } from 'react';
import { useGetRoleQuery } from './../api/useGetRoleQuery';

export const useGetRole = () => {
  const { data: userRole, isLoading, error } = useGetRoleQuery();

  return { userRole, isLoading, error };
};
