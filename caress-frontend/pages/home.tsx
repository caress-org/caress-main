import React, { useEffect, useState } from 'react';
import firebase from '@/firebase/clientApp';
import { useRouter } from 'next/router';
import auth from '@/firebase/detectSignin'
import Head from 'next/head';
import TopBar from '@/components/topbar';
import Bottombar from '@/components/bottombar';
import styles from '@/styles/home.module.css';
import Link from 'next/link';
import { orderBy } from 'firebase/firestore';

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
	  const [quizResultLoaded, setQuizResultLoaded] = useState<boolean>(false);
	  const [emojiDone, setEmojiDone] = useState<boolean>(false);

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
		firebase.firestore().collection('users').doc(user?.uid).collection('mood').doc(new Date().toDateString()).set({
			mood: emotion,
			date: new Date().toDateString()
		})
		setEmojiDone(true);
	}

	  useEffect(() => {
		const checkAuthentication = async () => {
		  try {
			const currentUser = await auth.isLoggedIn();
			console.log('User object:', currentUser);
			setUser(currentUser);
	  
			if (currentUser) {
				console.log(emojiDone);
				const today = new Date().toDateString();
				if (emojiDone == false) {
					console.log('emoji not done');
					// Check if the user's emoji is already cached

					const emojiRef = firebase
						.firestore()
						.collection('users')
						.doc(currentUser.uid)
						.collection('mood').orderBy('date', 'asc').limit(1);
					const snapshot = await emojiRef.get();
					if (snapshot.empty) {
						console.log('emoji not done');
						setEmojiDone(false);
					}
					if (!snapshot.empty && snapshot.docs[0].data().date == today) {
						setEmojiDone(true);
					}
				
				}
			  // Check if latest quiz result is already cached
			  if (!latestQuizResult) {
				// Fetch the latest quiz result from Firestore
				const latestResultRef = firebase
				  .firestore()
				  .collection('users')
				  .doc(currentUser.uid)
				  .collection('caress-results')
				  .orderBy('date', 'desc')
				  .limit(1);
		  
				const snapshot = await latestResultRef.get();
		  
				if (!snapshot.empty) {
				  const latestResult = snapshot.docs[0].data() as QuizResult;
				  setLatestQuizResult(latestResult);
				}
			  }
			  setQuizResultLoaded(true);
			}
		  } catch (error) {
			console.log('Error checking authentication:', error);
			router.replace('/login');
		  }
		};
	  
		checkAuthentication();
	  }, [user]);

	  console.log('hello');
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

		{/*<br />*/}

    <div className={styles.welcome}>
      Welcome Back 👋
    </div>
	{emojiDone == false && (
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
	)}
	

{quizResultLoaded && latestQuizResult && (
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
<div className={styles.card}>
	<div className={styles.mh}>
		Not yet taken your weekly Mental Health Quiz?
	</div>
	<div>
		<Link className={styles.link} href="/quizes">
		Click here to take it now!
		</Link>
	</div>
</div>
<div className={styles.card}>
	<div className={styles.mh}>
		Not yet taken your Personality Quiz?
	</div>
	<div>
		<Link className={styles.link} href="/quizes">
		Click here to take it now!
		</Link>
	</div>
</div>

</div>

		<Bottombar/>
		</>
	)
}