import { setAlert, setConfAlert } from '@/mixins'
import React from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

export default function LinkSubCard({ title, okMsg, confMsg }) {
    return (
        <div className="indicator flex flex-col w-full md:w-96 my-10">
            <p className='tracking-widest my-3'>DEMO:</p>
            <div className='text-white flex flex-col items-end justify-center space-y-5 w-full m-auto border border-dashed p-3 rounded-lg'>
                <div className='flex flex-col items-center justify-center space-y-1 w-full'>
                    <div className='w-full flex flex-row items-center text-center justify-start space-x-3'>
                        <span className='text-base text-center w-full'><ReactMarkdown>{title}</ReactMarkdown></span>
                    </div>
                    <input type="text" placeholder="https://twitter/com" className="input text-base font-normal border-white focus:outline-none hover:outline-none bg-black w-full" />
                </div>
                <button onClick={(e) => setConfAlert('', okMsg, confMsg, (succTitle) => setAlert('', succTitle))} className="btn outline-solid text-white text-base font-normal outline-white btn-outline md:btn-md w-full rounded-none">Submit link</button>
            </div>
        </div>
    )
}
