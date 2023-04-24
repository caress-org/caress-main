import Bottombar from '@/components/bottombar';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/search.module.css';
import { LucideSearch } from 'lucide-react';
import { useRouter } from 'next/router';
import firebase from '@/firebase/clientApp';
import auth from '@/firebase/detectSignin'

export default function Search() {

	const router = useRouter();

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

	  interface Therapist {
		exists:  boolean;
		bio: string;
	  }

	  const [user, setUser] = useState<User | null>(null);
	  const [therapist, setTherapist] = useState<Therapist | null>(null);
	  const [isLoading, setIsLoading] = useState(true);
	  const [therapistUids, setTherapistUids] = useState<string[]>([]);

	  useEffect(() => {
		const getUser = async () => {
			const currentUser = await auth.isLoggedIn();
			console.log('User object:', currentUser);
			setUser(currentUser);
			setIsLoading(false);
		  };
		  getUser();
		
		  if (!user) {
			return;
		  }
		
		  const checkAuthentication = async () => {
			try {
			  await auth.isLoggedIn();
			} catch (error) {
			  router.replace('/login');
			} 
		  };
		  checkAuthentication();

		  const therapists = async () => {
			const querySnapshot = await firebase.firestore().collection('therapists').limit(25).get();
			const therapistUids = querySnapshot.docs.map((doc) => doc.id);
			console.log(`uid = ${therapistUids}`);
			setTherapistUids(therapistUids);
			// setTherapist(therapistUids);
		  }

		  therapists();
	}, [])

    return (
        <>
		<Head>
			<title>
				Search For Therapists
			</title>
		</Head>
		<div className={styles.search}>
			<div className={styles.searchInput}>
			<LucideSearch/>
			</div>
		</div>
		<Bottombar/>
		</>
    )
} 
