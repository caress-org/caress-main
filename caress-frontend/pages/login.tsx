import styles from '@/styles/Home.module.css'
import React from 'react';

export default function Login() {
	return (
		<>
			<div className={styles.center}>
			<img src="/caress-login-0.png" alt="caress" className='login-jpg' />
		    </div>

			<br />
			<br />

			<div className="login-btns">
			<button className='login-btn'>
				<div className='btn-column'><img className='login-logo' src="google-logo-9808.png" alt="" height={25}/><p>Continue with Google</p></div>
			</button>
			</div>

			<div className="login-btns">
			<button className='login-btn'>
			<div className='btn-column'><img className='login-logo' src="facebook.png" alt="" height={25}/><p>Continue with Facebook</p></div>
			</button>
			</div>
		</>
	)
}