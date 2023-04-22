import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import auth from '@/firebase/detectSignin';
import styles from '@/styles/profile.module.css';
import Bottombar from '@/components/bottombar';
import firebase from '@/firebase/clientApp';
import Head from 'next/head';
import { LucideArrowRight, LucideSettings } from 'lucide-react';

export default function ProfileView() {
  const router = useRouter();
  const { user } = auth.useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
	const checkAuthentication = async () => {
	  try {
		const user = await auth.isLoggedIn();
	  } catch (error) {
		router.replace('/login');
	  } 
	  
	};

	checkAuthentication();
  }, []);


  useEffect(() => {
    if (!user) {
      //  router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, [user, router]);

  const handleLogout = async () => {
	try {
	  await firebase.auth().signOut();
	  router.push('/login');
	} catch (error) {
	  console.error(error);
	}
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const Caress_results = () => {
	console.log('clicked');
  }

  return (
	<>
	<Head>
		<title>Profile</title>
	</Head>
    <div className={styles.container}>
      <div className={styles.header}>
        {/*<img src="/logo.png" alt="Logo" />*/}
		<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
		<img src={(user as any)?.photoURL} alt="Profile picture" />
        <div>
          <p>{(user as any)?.displayName ?? 'Unknown'}</p>
          {/*<p>{(user as any)?.email ?? 'Unknown'}</p>*/}
        </div>
		</div>
		<LucideSettings style={{marginRight: '10px'}}/>
        {/*<h1>Profile</h1>*/}
        {/*<button className={styles.signout_btn} onClick={handleLogout}>Log Out</button>*/}
      </div>
      <div className={styles.card} onClick={Caress_results}>
		<div className={styles.row}>
			<div>
				<p>Mental Health Reports</p>
			</div>
			<div>
				<LucideArrowRight/>
			</div>
		</div>
      </div>
    </div>
	<div className={styles.card}>
		<div className={styles.title}>
			Traits
		</div>
	</div>
	<Bottombar/>
	</>
  );
}
