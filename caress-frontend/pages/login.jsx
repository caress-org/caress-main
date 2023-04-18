import styles from '@/styles/Home.module.css'
import firebase from '@/firebase/clientApp';
import React from 'react';
import 'firebase/compat/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Login() {

	const router = useRouter();
	const [user, loading, error] = useAuthState(firebase.auth());

	console.log(error);
	console.log(user);

	useEffect(() => {
		if (user) {
			router.replace('/home/');
		}
}, [user]);

	const handleSignInWithFacebook = async () => {
	  const auth = firebase.auth();
	  const provider = new firebase.auth.FacebookAuthProvider();
	  try {
		await auth.signInWithPopup(provider);
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