import styles from '@/styles/Home.module.css'
import firebase from '@/firebase/clientApp';
import React from 'react';
import 'firebase/compat/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import auth from '@/firebase/detectSignin';
import Head from 'next/head';

export default function Login() {

	const router = useRouter();
	
	auth.isSignedIn();

	useEffect(() => {
		const checkAuthentication = async () => {
		  try {
			const user = await auth.isLoggedIn();
			router.replace('/home/')
		  } catch (error) {
		  }
		};
	
		checkAuthentication();
	  }, []);

	//useEffect(() => {
	//	const checkAuthentication = async () => {
	//	  const user = await auth.isLoggedIn();
	
	//	  if (user) {
	//		router.replace('/home/');
	//	  }
	//	};
	
	//	checkAuthentication();
	//  }, []);

	const handleSignInWithFacebook = async () => {
	  const auth = firebase.auth();
	  const provider = new firebase.auth.FacebookAuthProvider();
	  try {
		await auth.signInWithPopup(provider);
		//router.replace('/home/');
	  } catch (error) {
		console.error(error);
	  }
	};

	const handleSignInWithGoogle = async () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		try {
		  await firebase.auth().signInWithPopup(provider);
		} catch (error) {
		  console.error(error);
		}
	  };

	return (
		<>
		<Head>
			<title>
				Login | Caress
			</title>
		</Head>
			<div className={styles.center}>
			<img src="/caress-login-0.png" alt="caress" className='login-jpg' />
		    </div>

			<br />
			<br />

			<div className="login-btns">
			<button className='login-btn' onClick={handleSignInWithGoogle}>
				<div className='btn-column'><img className='login-logo' src="google-logo-9808.png" alt="" height={25}/><p>Continue with Google</p></div>
			</button>
			</div>

			<div className="login-btns">
			<button className='login-btn' onClick={handleSignInWithFacebook}>
			<div className='btn-column'><img className='login-logo' src="facebook.png" alt="" height={25}/><p>Continue with Facebook</p></div>
			</button>
			</div>
		</>
	)
}