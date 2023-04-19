import React, { useEffect } from 'react';
import firebase from '@/firebase/clientApp';
import { useRouter } from 'next/router';
import auth from '@/firebase/detectSignin'
import Head from 'next/head';
import TopBar from '@/components/topbar';
import Bottombar from '@/components/bottombar';


export default function Home() {	

	auth.isSignedIn();

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
		<Head>
        <title>DashBoard</title>
      </Head>
      <TopBar />
		{/*<div className="login-btns">
			<button className='login-btn' onClick={handleLogout}>
				<div className='btn-column'><p>Log Out</p></div>
			</button>
		</div>*/}
		<Bottombar/>
		</>
	)
}