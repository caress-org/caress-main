import { useEffect, useState } from 'react';
import styles from '@/styles/TopBar.module.css';
import Link from 'next/link';
import { LucideUser, Settings } from 'lucide-react';
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
		  const currentUser = await auth.isLoggedIn();
		  console.log('User object:', currentUser);
		  setUser(currentUser);
		};
		getUser();
	  }, []);

  return (
    <div className={styles.topbar}>
      <div className={styles.left}>
      <Link href="/home">
	  <span className={styles.greeting}>Hey {user?.displayName?.split(' ')[0]}!</span>
      </Link>
	  </div>
      <Link href="/profile">
        <LucideUser />
      </Link>
    </div>
  );
}
