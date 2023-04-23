import Bottombar from "@/components/bottombar";
import React from "react";
import styles from '@/styles/chats.module.css'
import { LucideArrowLeft, LucideSearch, LucideUser } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Chats() {

	//let now = new Date();
	//let time = now.toTimeString().split(' ')[0];
	
	const router = useRouter();

	const onClickFunction = () => {
		router.replace('/chats/chatbot');
	}
	
	return (
		<>
		<Head>
			<title>
				Chats
			</title>
		</Head>
		<div className={styles.header}>
			<div className={styles.top}>
				<LucideArrowLeft className={styles.arrow}/>
				<p>Chats</p>
			</div>
		</div>
		<div className={styles.search}>
			<div className={styles.searchInput}>
			<LucideSearch/>
			</div>
		</div>
		 <div className={styles.chatContainer}>
        <div className={styles.chatList}>
          <div className={styles.chat} onClick={onClickFunction}>
            <div className={styles.chatAvatar}>
				<LucideUser></LucideUser>
			</div>
            <div className={styles.chatInfo}>
              <div className={styles.chatName}>ChatBot</div>
              <div className={styles.chatPreview}>
                Hey, I am an AI therapist
              </div>
            </div>
            <div className={styles.chatTime}></div>
          </div>
        </div>
        {/*<div className={styles.chatWindow}>
          <div className={styles.messageContainer}>
            <div className={styles.message}>
              <div className={styles.messageText}>
                Hey, how's it going?
              </div>
              <div className={styles.messageTime}>10:30 AM</div>
            </div>
            <div className={styles.message}>
              <div className={styles.messageText}>
                Not bad, you?
              </div>
              <div className={styles.messageTime}>10:31 AM</div>
            </div>
          </div>
          <div className={styles.messageInput}>
            <input type="text" placeholder="Type your message here" />
            <button>Send</button>
          </div>
        </div>*/}
      </div>
		<Bottombar/>
		</>
	)
}