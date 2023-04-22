import Bottombar from '@/components/bottombar';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/home.module.css'
import { useRouter } from 'next/router';
import firebase from '@/firebase/clientApp';
import auth from '@/firebase/detectSignin';

export default function Quiz() {

	auth.isLoggedIn();

	const router = useRouter();
	const [user, setUser] = useState<firebase.User | null>(null);

	const now = new Date();
	const [latestResult, setLatestResult] = useState<null | any>(null);
	const [daysDiff, setDaysDiff] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	async function fetchUser() {
		const user = await firebase.auth().currentUser;
		return user;
	}

	useEffect(() => {
		async function fetchLatestResult() {
			const user = await fetchUser();
			if (user) {
				const latestResultRef = firebase.firestore().collection('users').doc(user.uid).collection('caress-results')
				  .orderBy('date', 'desc')
				  .limit(1);
				const snapshot = await latestResultRef.get();
				if (!snapshot.empty) {
				  const latestResultData = snapshot.docs[0].data();
				  const latestResultDate = new Date(latestResultData.date);
				  const diff = Math.floor((now.getTime() - latestResultDate.getTime()) / (1000 * 3600 * 24));
				  setLatestResult(latestResultData);
				  setDaysDiff(diff);
				} else {
				  setLatestResult(null);
				  setDaysDiff(null);
				}
			}
			setIsLoading(false);
		}
		fetchLatestResult();
	}, [now]);

	if (isLoading) {
		return <div>Loading...</div>;
	}


	return (
		<div className={styles.content}>
		<Head>
			<title>Quizes</title>
		</Head>
			<div className={styles.quiz_title}>
				Different Health Models
			</div>

			<div className={styles.container}>
				<div className={styles.title} > 
					Caress Model (Weekly Mental Health Assesment)
				</div>
				<div>
				CARESS model is made by us to be used in therapy to assess and address a client's mental and emotional state. <a href="" className={styles.a}>Learn more about it.</a> The acronym stands for:

					<div className={styles.scores}>
      					<ul className={styles.q_my_list}>
      					  <li className={styles.q_li}>Coping Strategies and Self-Care</li>
      					  <li className={styles.q_li}>Appetite and Eating Habits</li>
      					  <li className={styles.q_li}>Relationships and Social Support</li>
      					  <li className={styles.q_li}>Energy and Motivation</li>
      					  <li className={styles.q_li}>Sleep</li>
      					  <li className={styles.q_li}>Sentiment and Emotional State</li>
      					</ul>
    				</div>
				</div>
				<div>
          {latestResult && daysDiff !== null && daysDiff < 7 ? (
            <button className={styles.btn}>Wait {7 - daysDiff} days to take the quiz again</button>
          ) : (
            <button className={styles.btn} onClick={ () => router.push('/quizes/caress-quiz') }>Take Quiz</button>
			)}
			</div>
			</div>

			<div className={styles.container}>
				<div className={styles.title} > 
					Ocean Model (Personality Test)
				</div>
				<div>
				The OCEAN model is widely used in psychology research, career counseling, and personal development. It can help individuals gain a better understanding of themselves and others, and identify areas for personal growth and improvement. <a href="" className={styles.a}>Learn more about it.</a> The acronym stands for:

					<div className={styles.scores}>
      					<ul className={styles.q_my_list}>
      					  <li className={styles.q_li}>Openness</li>
      					  <li className={styles.q_li}>Conscientiousness</li>
      					  <li className={styles.q_li}>Extraversion</li>
      					  <li className={styles.q_li}>Agreeableness</li>
      					  <li className={styles.q_li}>Neuroticism</li>
      					</ul>
    				</div>
				</div>
				<button className={styles.btn} onClick={ () => router.push('/quizes/ocean-quiz') }>Take Quiz</button>

				</div>

			

		<Bottombar/>

		</div>
	)
}