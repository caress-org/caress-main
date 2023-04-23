import Bottombar from "@/components/bottombar";
import React from "react";
import styles from '@/styles/chats.module.css'
import { LucideArrowLeft, LucideSearch, LucideUser } from "lucide-react";

export default function Chats() {
	
	
	return (
		<>
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
          <div className={styles.chat}>
            <div className={styles.chatAvatar}>
				<LucideUser></LucideUser>
			</div>
            <div className={styles.chatInfo}>
              <div className={styles.chatName}>ChatBot</div>
              <div className={styles.chatPreview}>
                Hey, how's it going?
              </div>
            </div>
            <div className={styles.chatTime}>10:30 AM</div>
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