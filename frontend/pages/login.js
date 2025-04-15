import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

import { ME } from '../graphql/authMutations';
import AuthForm from '../components/AuthForm';

export default function Login() {
  const router = useRouter();
  const { data } = useQuery(ME);

  useEffect(() => {
    // If already logged in, redirect to home or intended page
    if (data?.me) {
      const redirectUrl = sessionStorage.getItem('redirectUrl') || '/';
      sessionStorage.removeItem('redirectUrl');
      router.push(redirectUrl);
    }
  }, [data, router]);

  return <AuthForm type="login" />;
}