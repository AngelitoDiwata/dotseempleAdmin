import { getUserByHandle, updateStatus } from '@/firebase'
import { setAlert } from '@/mixins'
import React, { useEffect, useState } from 'react'
import ExpDefinition from './ExpDefinition'
import Modal from './Modal'

export default function LinkTable({ listData, setTotal }) {

    const [modalVisible, setModalVisible] = useState(false)
    const [currentUser, setCurrentUser] = useState({})
    const [isAccept, setIsAccept] = useState(false)

    useEffect(() => {
        setTotal(listData.filter((item) => {
            const itemDate = new Date(item.date)
            return item.status === 'PENDING' && msToTime(itemDate.setDate(itemDate.getDate() + 2) - new Date()) >= 0.0
        }).length)
    }, [listData])
    const acceptEntry = (handle) => {
        getUserByHandle(handle).then((data) => {
            const res = data.val()
            setCurrentUser(Object.values(res)[0])
            setIsAccept(true)
            setModalVisible(true)
        })
    }
    const revokeEntry = (handle) => {
        getUserByHandle(handle).then((data) => {
            const res = Object.values(data.val())[0]
            setIsAccept(false)
            updateEntry(res.uuid, 'REVOKED')
            setAlert(`Revoked ${res.handle}'s entry`)
        })

    }

    const updateEntry = (uuid, status) => {
        updateStatus({ uuid, status})
    }

    const msToTime = (ms) => {
        let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
        return days
    }
    return (
        !modalVisible ? <div className="overflow-x-auto w-full h-96 mx-auto">
            <table className="table w-full">
                {/* head */}
                <thead>
                    <tr>
                        <th>Handle</th>
                        <th>Wallet</th>
                        <th>Date</th>
                        <th>Link</th>
                        <th>Status</th>
                        <th className='bg-neutral-800 text-center'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        listData.filter((item) => {
                            const itemDate = new Date(item.date)
                            return item.status === 'PENDING' && msToTime(itemDate.setDate(itemDate.getDate() + 2) - new Date()) >= 0.0
                        }).map((item, ind) => {
                            return <tr key={ind}>
                                {
                                    Object.keys(item).map((key, index) => {
                                        if (key === 'link') {
                                            return <td key={index}><a href={item[key]} target="_blank">{item[key]}</a></td>
                                        } else if (key === 'date') {
                                            return <ExpDefinition keyName={index} date={item[key]} />
                                        } else {
                                            return <td key={index}>{item[key]}</td>
                                        }
                                    })
                                }
                                <td key={item} className='bg-neutral-900 text-center flex flex-col items-center justify-center space-y-2'>
                                    <button disabled={item.status !== 'PENDING'} onClick={() => acceptEntry(item.handle)} className="btn btn-outline btn-sm w-full">Approve</button>
                                    <button disabled={item.status !== 'PENDING'} onClick={() => revokeEntry(item.handle)} className="btn btn-outline btn-sm w-full">Revoke</button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div> : <Modal user={currentUser} callBack={() => updateEntry(currentUser.uuid, 'ACCEPTED')} modalClose={() => setModalVisible(false)} />
    )
}
