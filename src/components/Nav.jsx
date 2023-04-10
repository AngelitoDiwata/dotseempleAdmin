import { userSignout } from '@/firebase'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import NavDrop from './NavDrop'

export default function Nav() {
    const router = useRouter()
    const signOut = () => {
        userSignout().then(() => {
            router.push('/login')
        })
    }
    return (
        <div className="navbar text-white bg-black">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link href="convert"><span className='text-lg'>📄</span>CSV to Metadata</Link></li>
                        <li><Link href="deploy"><span className='text-lg'>💻</span>CODE management</Link></li>
                        <li><Link href="quote"><span className='text-lg'>📜</span>Quote of the day</Link></li>
                        <li><Link href="linksub"><span className='text-lg'>🌐</span>Link Sub CMS</Link></li>
                        <li><Link href="mailbox"><span className='text-lg'>📬</span>Mailbox</Link></li>
                        <li><Link href="drop"><span className='text-lg'>⬇️</span>DROP STASH</Link></li>
                        <li className='bg-neutral-900'><span onClick={() => signOut()}>Signout</span></li>
                    </ul>
                </div>
                <Link href="/" className="btn btn-ghost normal-case text-xl">⦿ Admin</Link>
            </div>
        </div>
    )
}
