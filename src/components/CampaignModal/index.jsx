import { addCampagin, updateCampagin } from '@/firebase'
import { setAlert, setConfAlert } from '@/mixins'
import React, { useEffect, useState } from 'react'
import GenericTable from '../GenericTable';
import LinkSubCard from '../LinkSubCard';

export default function CampaignModal({ visible, setVisible, editData = null }) {
    const [visibility, setVisibility] = useState(false)
    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [TTL, setTTL] = useState('')
    const [okMsg, setOkMsg] = useState('')
    const [confMsg, setConfMsg] = useState('')

    useEffect(() => {
        setVisibility(() => visible)
        if (!visible) {
            setName(() => '')
            setTitle(() => '')
            setTTL(() => '')
            setConfMsg(() => '')
            setOkMsg(() => '')
        }
    }, [visible])

    useEffect(() => {
        if (editData !== null) {
            setName(() => editData.name)
            setTitle(() => editData.title)
            setTTL(() => editData.end_date)
            setConfMsg(() => editData.confirm_message)
            setOkMsg(() => editData.success_message)
        }
    }, [editData])

    const goBind = (e, callBack) => {
        callBack(() => e.target.value)
    }

    const publishData = () => {
        const metaData = {
            uuid: editData? editData.id : new Date(),
            name,
            title,
            ttl: TTL,
            confMsg,
            okMsg
        }
        if (!editData) {
            addCampagin(metaData).then(() => {
                setAlert('', `successfully added ${name} campaign!`)
                setVisible(false)
            })
        } else {
            updateCampagin(metaData).then(() => {
                setAlert('', `successfully updated ${name} campaign!`)
                setVisible(false)
            })
        }
    }

    return (visibility &&
        <div className='absolute top-0 w-full m-auto h-screen bg-black p-5 z-50 pt-10'>
            <div className='w-full lg:w-2/3 m-auto'>
                <div className='w-full flex flex-row items-center justify-between'>
                    <span className='text-lg md:text-base font-bold w-2/3'>{editData ? editData.name : '📝 Create a campaign'}</span>
                    <span onClick={() => setVisible(false)} className='cursor-pointer'>close</span>
                </div>
                <div className='flex flex-row items-center justify-center border-none md:border md:border-neutral-700 my-3'>
                    <LinkSubCard title={title} confMsg={confMsg} okMsg={okMsg} />
                </div>
                <div className='w-full flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-5 border border-neutral-700 p-3'>

                    <div className='flex flex-col items-start justify-center w-full'>
                        <span>Campagin name</span>
                        <textarea value={name} onChange={(e) => goBind(e, setName)} placeholder="Link sub campaign title" className="resize-none textarea textarea-bordered textarea-sm w-full" ></textarea>
                    </div>

                    <div className='flex flex-col items-start justify-center w-full'>
                        <span>Link sub title</span>
                        <textarea value={title} onChange={(e) => goBind(e, setTitle)} placeholder="Title of the link sub card" className="resize-none textarea textarea-bordered textarea-sm w-full" ></textarea>
                    </div>

                    <div className='flex flex-col items-start justify-center w-full'>
                        <span>End date (time to live)</span>
                        <input value={TTL} onChange={(e) => goBind(e, setTTL)} type="date" placeholder="Set a date when this will end" className="input input-bordered w-full" />
                    </div>

                    <div className='flex flex-col items-start justify-center w-full'>
                        <span>Confirmation message</span>
                        <textarea value={confMsg} onChange={(e) => goBind(e, setConfMsg)} placeholder="Confirm alert message" className="resize-none textarea textarea-bordered textarea-sm w-full" ></textarea>
                    </div>

                    <div className='flex flex-col items-start justify-center w-full'>
                        <span>Success message</span>
                        <textarea value={okMsg} onChange={(e) => goBind(e, setOkMsg)} placeholder="Success alert message" className="resize-none textarea textarea-bordered textarea-sm w-full" ></textarea>
                    </div>

                </div>
                <div className='w-full flex flex-row items-center justify-end my-5 pb-10'>
                    <button onClick={publishData} className="btn btn-outline btn-md">{editData ? 'Update Details' : 'Publish'}</button>
                </div>
                {
                    editData && <div>
                        <h1>Campaign Participants:</h1>
                        <GenericTable selectable={false} tableData={editData.participants ? Object.values(editData.participants) : [{ no_participants_yet: '' }]} />
                    </div>
                }
            </div>
        </div>
    )
}
