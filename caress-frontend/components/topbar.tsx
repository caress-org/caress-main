import { useEffect, useState } from 'react';
import styles from '@/styles/TopBar.module.css';
import Link from 'next/link';
import { Settings } from 'lucide-react';
import firebase from '@/firebase/clientApp';
import 'firebase/auth';
import auth from '@/firebase/detectSignin';

export default function TopBar() {

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

	useEffect(() => {
		const getUser = async () => {
		  const currentUser = await auth.forTopBarPfp();
		  console.log('User object:', currentUser);
		  setUser(currentUser);
		};
		getUser();
	  }, []);

  return (
    <div className={styles.topbar}>
      <div className={styles.left}><Link href="/home">
        {user && user.photoURL ? (
          <img className={styles.pfp} src={user.photoURL} alt="Profile Picture" />
        ) : (
          <span>Home</span>
        )}
      </Link>
      <Link href="/home">
        <span>Dashboard</span>
      </Link>
	  </div>
      <Link href="/settings">
        <Settings />
      </Link>
    </div>
  );
}
