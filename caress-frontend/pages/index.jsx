import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '@/firebase/clientApp'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	
	const router = useRouter();
	const [user, loading, error] = useAuthState(firebase.auth());

	console.log(error);
	console.log(user);

	useEffect(() => {
		if (user) {
			router.replace('/home/');
		} else {
			router.replace('/login/');
		
	}
}, [user]);
		
	
  return (
    <>
      <Head>
        <title>Caress App</title>
        <meta name="description" content="Taking care of your mind one step at a time" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      </main>
    </>
  )
}
