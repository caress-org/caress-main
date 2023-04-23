import Head from 'next/head';
import React from 'react';
import styles from '@/styles/chats.module.css';
import { LucideArrowLeft, LucideUser } from 'lucide-react';
import { useRouter } from 'next/router';


export default function ChatBot() {

	const router = useRouter();

	const goBack = () => {
		router.replace("/chats");
	}

	return (
		<>
		<Head>
			<title>
				ChatBot
			</title>
		</Head>
		<div className={styles.headerr}>
			<div className={styles.icon}>
				<LucideArrowLeft onClick={goBack} className={styles.arrow} />
				<div className={styles.chatAvatar}>
					<LucideUser/>
				</div>
				<p className={styles.name}>ChatBot</p>
			</div>
		</div>
		</>
	)
}