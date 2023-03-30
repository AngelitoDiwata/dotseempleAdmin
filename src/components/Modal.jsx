import { db, incentivize } from '@/firebase';
import { setAlert } from '@/mixins';
import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'

export default function Modal({ user, modalClose, callBack = () => {} }) {

    const [userDetails, setUserDetails] = useState({})
    const [amount, setAmount] = useState(0)
    useEffect(() => {
        onValue(ref(db, `/data/${user.uuid}`), (snapshot) => {
            const res = snapshot.val();
            try {
                res !== undefined ? setUserDetails(res) : setUserDetails({})
            } catch (_) {

            }
        });
    }, [])

    useEffect(() => {
        if(!userDetails && !userDetails.email) {
            modalClose()
        }
    }, [userDetails])

    const onSubmit = () => {
        const collection = user.collections ? user.collections :[] 
        const submitData = {
            uuid: user.uuid,
            collections: [...collection,...[...Array(parseInt(amount)).keys()].map(() => {
                return window.crypto.randomUUID()
            })]
        }
        incentivize(submitData).then(() => {
            callBack()
            setAlert('', `successfully added ${amount} points to ${user.handle}`)
            modalClose()
        })
    }

    return (
        <div className='w-full h-screen flex flex-col items-center justify-start space-y-5 m-auto bg-black'>
            <div className='w-11/12 md:w-1/2 flex flex-row items-center justify-end h-fit p-10'>
                <span className='text-white hover:cursor-pointer hover:font-black' onClick={() => modalClose()}>Close</span>
            </div>
            <div className='w-11/12 md:w-1/2 lg:w-96 flex flex-col items-center justify-center h-fit p-10 border border-white border-dashed rounded-lg'>
                <h1 className='w-full text-left'>{userDetails.handle}<sup className='font-black text-white px-3'>{userDetails.connections}</sup></h1>
                <h4 className='text-white font-thin text-xs text-left w-full my-2'>{userDetails.email && userDetails.email.toLowerCase()}</h4>
                <p className='py-10 italic w-full text-justify'>{userDetails.bio}</p>
                <div className='flex flex-row items-center justify-center w-full space-x-3'>
                    <span className='w-fit'>Give</span>
                    <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" min={0} className='input input-bordered border-white border-2 input-md w-1/2' />
                    <span className='w-fit'>points</span>
                </div>
                <button onClick={onSubmit} className="btn btn-outline mt-10 w-11/12">GIVE</button>
            </div>
        </div>
    )
}
