import React from 'react';
import firebase from '@/firebase/clientApp';
import { useRouter } from 'next/router';

export default function Home() {
	const router = useRouter();
	const handleLogout = async () => {
		try {
		  await firebase.auth().signOut();
		  router.push('/login');
		} catch (error) {
		  console.error(error);
		}
	  };
	return (
		<>
		<div className="login-btns">
			<button className='login-btn' onClick={handleLogout}>
				<div className='btn-column'><p>Log Out</p></div>
			</button>
			</div>
		</>
	)
}