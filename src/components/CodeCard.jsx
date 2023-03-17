import React, { useEffect, useState } from 'react'

export default function CodeCard({ name, code, date }) {

    const [TTL, setTTL] = useState('')

    useEffect(() => {
        setInterval(() => {
            setTTL(msToTime(new Date(date) - new Date()))
        }, 1000);
    }, [])

    const msToTime = (ms) => {
        let seconds = (ms / 1000).toFixed(1);
        let minutes = (ms / (1000 * 60)).toFixed(1);
        let hours = (ms / (1000 * 60 * 60)).toFixed(1);
        let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
        if (seconds < 60) return seconds + " Seconds remaining";
        else if (minutes < 60) return minutes + " Minutes remaining";
        else if (hours < 24) return hours + " Hrs remaining";
        else return days + " Days remaining"
    }
    return (
        !TTL.toString().includes('-') ? <div className={`w-full h-60 flex flex-row items-center px-3 py-5 justify-between rounded-md bg-neutral-800`}>
            <div className='text-white w-full m-auto h-fit flex flex-col items-start justify-start'>
                <span className='px-3 py-2 md:pt-5 text-sm md:text-lg flex flex-col items-start justify-start'>
                    <span className='text-xs text-white'>Description:</span> <span className='text-md'>{name}</span>
                </span>
                <span className='px-3 py-2 md:pb-5 text-sm md:text-xl flex flex-col items-start justify-start'>
                    <span className='text-xs text-white'>Code:</span> <span className='text-lg'> {code}</span>
                </span>
                <span className='text-white text-sm md:text-base self-end mx-5'>
                    {TTL}
                </span>
            </div>
        </div> : null
    )
}
