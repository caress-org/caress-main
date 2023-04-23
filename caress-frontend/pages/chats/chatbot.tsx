import Head from 'next/head';
import React, { useState } from 'react';
import styles from '@/styles/chats.module.css';
import { LucideArrowLeft, LucideSend, LucideUser } from 'lucide-react';
import { useRouter } from 'next/router';


export default function ChatBot() {

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

	const router = useRouter();

	const goBack = () => {
		router.replace("/chats");
	}

	const sendMessage = () => {
	}

	const [formValue, setFormValue] = useState('');


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
		<form className={styles.form} onSubmit={sendMessage}>

      <input className={styles.input} value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Message..." />

      <button className={styles.button} type="submit" disabled={!formValue}><LucideSend/></button>

    </form>
		</>
	)
}