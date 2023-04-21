import Bottombar from '@/components/bottombar';
import Head from 'next/head';
import react from 'react';
import styles from '@/styles/home.module.css'

export default function Quiz() {

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
					Caress Model
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
					<button className={styles.btn}>Take Quiz</button>
				</div>
			</div>

		<Bottombar/>
		</div>
	)
}