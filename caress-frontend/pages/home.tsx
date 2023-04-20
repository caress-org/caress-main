import React, { useEffect, useState } from 'react';
import firebase from '@/firebase/clientApp';
import { useRouter } from 'next/router';
import auth from '@/firebase/detectSignin'
import Head from 'next/head';
import TopBar from '@/components/topbar';
import Bottombar from '@/components/bottombar';
import styles from '@/styles/home.module.css';

export default function Home() {	

	interface User {
		uid: string;
		email: string | null;
		displayName: string | null;
		photoURL: string | null;
		emailVerified: boolean;
		phoneNumber: string | null;
		isAnonymous: boolean;
		tenantId: string | null;
		providerData: any[];
	  }
	  

	  const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const getUser = async () => {
		  const currentUser = await auth.isLoggedIn();
		  console.log('User object:', currentUser);
		  setUser(currentUser);
		};
		getUser();
	  }, []);

	useEffect(() => {
		const checkAuthentication = async () => {
		  try {
			const user = await auth.isLoggedIn();
		  } catch (error) {
			router.replace('/login');
		  } 
		  
		};
	
		checkAuthentication();
	  }, []);

	const router = useRouter();
	const handleLogout = async () => {
		try {
		  await firebase.auth().signOut();
		  router.push('/login');
		} catch (error) {
		  console.error(error);
		}
	  };

	  const handleEmotionClick = async (emotion: string) => {
	  }

	return (
		<>
		<Head>
        <title>DashBoard</title>
      </Head>
      <TopBar />
		{/*<div className="login-btns">
			<button className='login-btn' onClick={handleLogout}>
				<div className='btn-column'><p>Log Out</p></div>
			</button>
		</div>*/}
	<div className={styles.content}>

    <div className={styles.welcome}>
      Welcome Back 👋
    </div>
	<div className={styles.card}>
  <div className={styles.title}>How are you feeling today?</div>
  <div className={styles.emotions}>
    <div className={styles.emotion} onClick={() => handleEmotionClick('😀')}>
      <span role="img" aria-label="Happy">😀</span>
    </div>
    <div className={styles.emotion} onClick={() => handleEmotionClick('😔')}>
      <span role="img" aria-label="Sad">😔</span>
    </div>
    <div className={styles.emotion} onClick={() => handleEmotionClick('😡')}>
      <span role="img" aria-label="Angry">😡</span>
    </div>
    <div className={styles.emotion} onClick={() => handleEmotionClick('😴')}>
      <span role="img" aria-label="Sleepy">😴</span>
    </div>
  </div>
</div>
{/*<div className={styles.card}>
	<div className={styles.mh}>
		Didn
	</div>
</div>*/}
<div className={styles.container}>
  <div className={styles.columns}>
    <div className={styles.mh}>
      Your Previous Week Mental Health Report:
    </div>
    <div className={styles.scores}>
      <ul className={styles.my_list}>
        <li className={styles.li}>Coping Strategies and Self-Care: 65</li>
        <li className={styles.li}>Appetite and Eating Habits: 28</li>
        <li className={styles.li}>Relationships and Social Support: 40</li>
        <li className={styles.li}>Energy and Motivation: 75</li>
        <li className={styles.li}>Sleep: 20</li>
        <li className={styles.li}>Sentiment: 20</li>
        <li className={styles.li}>Overall: 42.45/100</li>
      </ul>
    </div>
  </div>
</div>

</div>

		<Bottombar/>
		</>
	)
}