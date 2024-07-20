'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import fetchData from '@/utils/fetchData';
import { CircularProgress } from '@mui/material';

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { response } = await fetchData({ method: 'GET', pathname: '/auth' });

      if (response.status !== 200) return router.push('/signIn');
      
      router.push('/home');

    })();
  }, [router]);

  return (

    <div className='flex items-center justify-center w-full h-screen dark:bg-gray-900'>
      <CircularProgress />
    </div>

  )

};