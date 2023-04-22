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

	  interface QuizResult {
		date: string;
		copingStrategies: number;
		appetite: number;
		relationships: number;
		energy: number;
		sleep: number;
		sentiment: number;
		mhScore: number;
	  }
	  

	  const [user, setUser] = useState<User | null>(null);
	  const [latestQuizResult, setLatestQuizResult] = useState<QuizResult | null>(null);


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

	  useEffect(() => {
		const getLatestQuizResult = async () => {
		  try {
			const latestResultRef = firebase.firestore().collection('users').doc(user?.uid).collection('caress-results')
			  .orderBy('date', 'desc')
			  .limit(1);
	
			const snapshot = await latestResultRef.get();
	
			if (!snapshot.empty) {
			  const latestResult = snapshot.docs[0].data() as QuizResult;
			  setLatestQuizResult(latestResult);
			} else {
			  setLatestQuizResult(null);
			}
		  } catch (error) {
			console.log('Error getting latest quiz result:', error);
			setLatestQuizResult(null);
		  }
		};
	
		if (user) {
		  getLatestQuizResult();
		}
	  }, [user]);

	  console.log('hello')
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
		Give Caress Quiz
	</div>
</div>*/}
{latestQuizResult && (
<div className={styles.container}>
  <div className={styles.columns}>
    <div className={styles.mh}>
      Your Previous Week Mental Health Report:
    </div>
    <div className={styles.scores}>
      <ul className={styles.my_list}>
        <li className={styles.li}>Coping Strategies and Self-Care: {latestQuizResult.copingStrategies}</li>
        <li className={styles.li}>Appetite and Eating Habits: {latestQuizResult.appetite}</li>
        <li className={styles.li}>Relationships and Social Support: {latestQuizResult.relationships}</li>
        <li className={styles.li}>Energy and Motivation: {latestQuizResult.energy}</li>
        <li className={styles.li}>Sleep: {latestQuizResult.sleep}</li>
        <li className={styles.li}>Sentiment: {latestQuizResult.sentiment}</li>
        <li className={styles.li}>Overall: {latestQuizResult.mhScore}/100</li>
      </ul>
    </div>
  </div>
</div>
)}

</div>

		<Bottombar/>
		</>
	)
}