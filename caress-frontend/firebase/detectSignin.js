import react from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '@/firebase/clientApp'

const isSignedIn = () => {
	const router = useRouter();
	const [user, loading, error] = useAuthState(firebase.auth());

	console.log(error);
	console.log(user);

	useEffect(() => {
		if (user) {
			router.replace('/home/');
		} else {
			router.replace('/login/');
		
	}
}, [user]);
}

export default isSignedIn;