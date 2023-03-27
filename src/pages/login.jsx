import { signIn } from '@/firebase'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import swal from 'sweetalert'

export default function login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const submit = (e) => {
        e.preventDefault()
        if (username.trim().length > 0 && username.toLowerCase() === 'dotseemple@gmail.com' && password.trim().length > 0 && password === 'password123') {
            signIn(username, password).then(() => {
                setAlert('', 'Welcome, Dot!')
                router.push('/')
            }).catch(() => {
                setAlert('', 'Nope, not Dot.')
            })
        } else {
            setAlert('', 'Nope, not Dot.')
        }
    }

    const setAlert = (title, message) => {
        swal({
            title: title,
            text: message,
            timer: 2500,
            showCancelButton: false,
            button: false
        }).then(
            function () { },
            function (dismiss) {
                if (dismiss === 'timer') {
                }
            });
    }

    return (
        <div className='w-full h-screen flex flex-row items-center justify-center'>
            <form className='w-96 flex flex-col items-center justify-start space-y-5'>
                <input value={username} onChange={(e) => setUsername(e.target.value)} className='w-full p-3 border border-white rounded-lg bg-black text-white' type="text" placeholder='username' />
                <input value={password} onChange={(e) => setPassword(e.target.value)} className='w-full p-3 border border-white rounded-lg bg-black text-white' type="password" placeholder='password' />
                <button onClick={(e) => submit(e)} className='self-end p-3 border border-white rounded-lg bg-black text-white'>Login</button>
            </form>
        </div>
    )
}
