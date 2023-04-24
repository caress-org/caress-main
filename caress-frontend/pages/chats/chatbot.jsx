import Head from 'next/head';
import React, { useRef, useState, useEffect } from 'react';
import styles from '@/styles/chats.module.css';
import { LucideArrowLeft, LucideSend, LucideUser } from 'lucide-react';
import { useRouter } from 'next/router';
import firebase from '@/firebase/clientApp';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Query } from '@firebase/firestore';
import 'firebase/firestore';
import auth from '@/firebase/detectSignin';

export default function ChatBot() {

	//interface User {
	//	uid: string;
	//	email: string | null;
	//	displayName: string | null;
	//	photoURL: string | null;
	//	emailVerified: boolean;
	//	phoneNumber: string | null;
	//	isAnonymous: boolean;
	//	tenantId: string | null;
	//	providerData: any[];
	//  }

	//const [user, setUser] = useState("");

	
	const router = useRouter();

	const goBack = () => {
		router.replace("/chats");
	}

	const [user, setUser] = useState(null);
  const [formValue, setFormValue] = useState('');
  const dummy = useRef();
	const firestore = firebase.firestore();
  const messagesRef = firestore.collection('users').doc(user?.uid).collection('chatbot');
  const query = messagesRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query, { idField: 'id' });

  useEffect(() => {
		const authenticate = async () => {
		const currentUser = await auth.isLoggedIn();
		console.log('User object:', currentUser);
		setUser(currentUser);
    return currentUser;
		}
		authenticate();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = user;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };


	const photoURL = user?.photoURL;

	function ChatMessage(props) {
		//const { text, uid } = props.message;
		const { text, uid, photoURL } = props.message;
	
		const messageClass = uid === user.uid ? styles.sent : styles.received;
	
		return (<>
<div className={`${styles.message} ${messageClass}`}>
				<img className={styles.img} src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
				<p className={styles.text}>{text}</p>
			</div>
		</>)
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
		<div className={styles.messageArea}>
		{messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
		</div>
<span ref={dummy}></span>
		<form className={styles.form} onSubmit={sendMessage}>

      <input className={styles.input} value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Message..." />

      <button className={styles.button} type="submit" disabled={!formValue}><LucideSend/></button>

    </form>
		</>
	)
}

