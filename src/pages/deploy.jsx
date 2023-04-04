import Head from 'next/head'
import Nav from '@/components/Nav';
import { React, useState, useEffect } from 'react'
import { auth, db } from '@/firebase'
import { set, ref, onValue, remove } from "firebase/database";
import swal from 'sweetalert';
import CodeTable from '@/components/CodeTable';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router';
import { creds } from '@/mixins';

export default function DotSeempleCodes() {
    const [validCodes, setValidCodes] = useState([])
    const [desc, setDesc] = useState('')
    const [code, setCode] = useState('')
    const [endDate, setEndDate] = useState('')
    const [user] = useAuthState(auth)
    const router = useRouter()
    const changeHandler = (e, handler) => {
        handler(e.target.value)
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
    useEffect(() => {
        onValue(ref(db), (snapshot) => {
            setValidCodes([]);
            const res = snapshot.val();
            if (res) {
                res.codes !== undefined ? Object.values(res.codes).forEach((code) => {
                    if (new Date(code.ttl) > new Date()) {
                        setValidCodes((oldArray) => [...oldArray, code]);
                    }
                }) : setValidCodes([])
            }
        });
    }, []);


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


    const submit = () => {
        if (new Date(endDate) < new Date() || endDate === '') {
            setAlert('', `Please select a present time.`)
        } else if (code.trim().length === 0 || desc.trim().length === 0) {
            setAlert('', `Please provide valid code values.`)
        }
        else if (validCodes.filter((item) => new Date(item.ttl) > new Date()).map((item) => item.code).includes(code)) {
            setAlert('', `Code already running...`)
        } else {
            const uuid = crypto.randomUUID()
            set(ref(db, `/codes/${uuid}`), {
                name: desc,
                code: code,
                ttl: endDate
            });
            setAlert('', `Code ${code} running...`)
            setCode('')
            setDesc('')
            setEndDate('')
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
            <main className='w-full bg-black text-white'>
                <Nav />
                <div className='App w-full h-fit bg-black' >
                    <div className="sticky z-30 bg-black top-0 w-full m-auto flex flex-col md:flex-row items-start md:items-center justify-end py-5 space-y-3 md:space-x-3 space-x-0 md:space-y-0 px-10">
                        <input placeholder="Code description" className="text-white w-full md:w-40 border border-white bg-black input input-bordered" value={desc} onChange={(e) => changeHandler(e, setDesc)} />
                        <input placeholder="Actual Code" className="text-white w-full md:w-1/4 border border-white bg-black input input-bordered" value={code} onChange={(e) => changeHandler(e, setCode)} />
                        <input type="datetime-local" className="text-white w-full md:w-1/4 border border-white bg-black input input-bordered" onChange={(e) => changeHandler(e, setEndDate)} defaultValue={endDate} />
                        <button className="w-full md:w-auto hover:scale-110 transition-all font-semibold border hover:font-neutral-900 hover:border-2 border-white bg-black input input-bordered text-white" onClick={submit}>submit</button>
                    </div>
                    <div className='w-full h-screen flex flex-col items-start justify-start'>
                        {
                            validCodes.length > 0 ? <CodeTable listData={validCodes} /> : <div className='col-span-4 w-full flex flex-row items-center justify-center'>Wow, O_o such empty.</div>
                        }
                    </div>
                </div>
            </main>
        </>
    )
}
