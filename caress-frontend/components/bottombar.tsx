import Link from 'next/link'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser, faCog } from '@fortawesome/free-solid-svg-icons'
import styles from '@/styles/bottombar.module.css'
import { LucideEdit, LucideEdit3, LucideFileQuestion, LucideHome, LucideMessageSquare, LucideSearch, LucideUser, LucideUserCog } from 'lucide-react'

export default function Bottombar() {
  const router = useRouter()

  return (
    <div className={styles.bottombar}>
  <Link href="/home">
    <div className={router.pathname === '/home' ? styles.active : ''}>
      <LucideHome />
      {/*<span>Home</span>*/}
    </div>
  </Link>
  <Link href="/chat">
    <div className={router.pathname === '/chat' ? styles.active : ''}>
      <LucideMessageSquare />
      {/*<span>Profile</span>*/}
    </div>
  </Link>
  <Link href="/search">
    <div className={router.pathname === '/search' ? styles.active : ''}>
      <LucideSearch />
      {/*<span>Profile</span>*/}
    </div>
  </Link>
  <Link href="/quizes">
    <div className={router.pathname === '/quizes' ? styles.active : ''}>
      <LucideEdit />
      {/*<span>Settings</span>*/}
    </div>
  </Link>
  <Link href="/profile">
    <div className={router.pathname === '/profile' ? styles.active : ''}>
      <LucideUser />
      {/*<span>Settings</span>*/}
    </div>
  </Link>
</div>

  )
}
