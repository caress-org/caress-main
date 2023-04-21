import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import styles from '@/styles/results.module.css'

export default function Caress_result() {

	const router = useRouter();
	const results: any = router.query.result;
	let mhc = (0.1 * results[0]) + (0.15 * results[1]) + (0.15 * results[2]) + (0.25 * results[3]) + (0.2 * results[4]) + (0.15 * results[5])


	return (
		<div className={styles.content}>
  <Head>
    <title>Caress-Results</title>
  </Head>

  <div className={styles.container}>
  <h1 className={styles.title}>Quiz Results</h1>

  <div className={styles.resultContainer}>
    <div className={styles.result}>
      <div className={styles.label}>Coping Strategies & Self-Care:</div>
      <div className={styles.value}>{results[0]}</div>
    </div>
    <div className={styles.result}>
      <div className={styles.label}>Appetite & Eating Habits:</div>
      <div className={styles.value}>{results[1]}</div>
    </div>
    <div className={styles.result}>
      <div className={styles.label}>Relationships & Social Support:</div>
      <div className={styles.value}>{results[2]}</div>
    </div>
    <div className={styles.result}>
      <div className={styles.label}>Energy & Motivation:</div>
      <div className={styles.value}>{results[3]}</div>
    </div>
    <div className={styles.result}>
      <div className={styles.label}>Sleep:</div>
      <div className={styles.value}>{results[4]}</div>
    </div>
    <div className={styles.result}>
      <div className={styles.label}>Sentiment & Emotional State:</div>
      <div className={styles.value}>{results[5]}</div>
    </div>
  </div>

  <div className={styles.score}>
    <span className={styles.label}>Mental Health Score:</span>
    <span className={styles.value}>{mhc}/100</span>
  </div>
</div>

</div>

	)
}