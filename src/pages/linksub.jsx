import Nav from '@/components/Nav'
import { creds, setAlert, setConfAlert } from '@/mixins'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { auth, updateLinkSub } from '@/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown'

export default function LinkSubContent() {
    const [title, setTitle] = useState('')
    const [okMsg, setOkMsg] = useState('')
    const [confMsg, setConfMsg] = useState('')
    const [deductPts, setDeductPts] = useState(0)
    const [user] = useAuthState(auth)
    const router = useRouter()

    const checkIfValidAdmin = (user) => {
        if (user.email !== creds.superuser) {
            router.push('/login')
        }
    }

    useEffect(() => {
        if (user !== null) { checkIfValidAdmin(user) } else {
            router.push('/login')
        }

    }, [user])

    const publishContents = () => {
        if (title.trim().length > 0 && okMsg.trim().length > 0 && confMsg.trim().length > 0) {
            updateLinkSub({
                confMsg,
                deductPts,
                okMsg,
                title
            }).then(() => {
                setAlert('', 'Successfully updated link submission contents!')
            })
        } else {
            setAlert('', 'One of the fields cannot be empty.')
        }
    }



    return (
        <>
            <Head>
                <title>Dotseemple Admin</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className='w-full h-screen bg-black text-white'>
                <Nav />

                <div className='flex flex-col items-start justify-center w-11/12 m-auto p-3'>
                    <h1>Link content manager</h1>
                    <p>Change the contents of the link submission field</p>
                    <div className='flex flex-col md:flex-row items-center justify-start w-full m-auto mt-5'>
                        <div className='w-full md:w-fit m-auto flex flex-col items-center justify-center'>
                            <span className='my-5'>Demo:</span>
                            <div className="indicator w-full md:w-80">
                                <div className='text-white flex flex-col items-end justify-center space-y-5 w-full m-auto border border-dashed p-3 rounded-lg'>
                                    <div className='flex flex-col items-center justify-center space-y-1 w-full'>
                                        <div className='w-full flex flex-row items-center text-center justify-start space-x-3'>
                                            <span className='text-base text-justify w-full'><ReactMarkdown>{title}</ReactMarkdown></span>
                                        </div>
                                        <input type="text" placeholder="https://twitter/com" className="input text-base font-normal border-white focus:outline-none hover:outline-none bg-black w-full" />
                                    </div>
                                    <button onClick={(e) => setConfAlert('', okMsg, confMsg, (succTitle) => setAlert('', succTitle))} className="btn outline-solid text-white text-base font-normal outline-white btn-outline md:btn-md w-full rounded-none">Submit link</button>
                                </div>
                            </div>
                        </div>

                        <div className='w-full md:w-fit border border-dashed p-5 rounded-lg my-3 space-y-5 md:space-y-0 md:grid md:grid-cols-2 gap-4'>
                            <div className='flex flex-col items-start justify-start space-y-2'>
                                <span>Link submission title</span>
                                <textarea onChange={(e) => setTitle(e.target.value)} type="text" placeholder="title here" className="textarea resize-none w-full" />
                            </div>
                            <div className='flex flex-col items-start justify-start space-y-2'>
                                <span>Confirm message</span>
                                <textarea onChange={(e) => setConfMsg(e.target.value)} type="text" placeholder="Confirm message here" className="textarea resize-none w-full" />
                            </div>
                            <div className='flex flex-col items-start justify-start space-y-2'>
                                <span>Success message</span>
                                <textarea onChange={(e) => setOkMsg(e.target.value)} type="text" placeholder="Success message here" className="textarea resize-none w-full" />
                            </div>
                            <div className='flex flex-col items-start justify-start space-y-2'>
                                <span>Deduction points</span>
                                <input onChange={(e) => setDeductPts(e.target.value)} type="number" min={0} placeholder="points" className="input h-full w-full" />
                            </div>
                            <div></div>
                            <div>
                                <button onClick={publishContents} className="btn outline-solid text-white text-base font-normal outline-white btn-outline md:btn-md w-full rounded-none">Publish</button>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </>
    )
}
