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
        !TTL.toString().includes('-') ? <div className={`w-5/6 flex flex-row items-center justify-between rounded-md bg-neutral-800`}>
            <div className='w-full m-auto h-fit flex flex-col items-start justify-start'>
                <span className='px-3 py-2 md:pt-5 text-sm md:text-lg'>
                    <span className='text-xs mx-3'>Description:</span> <span className='text-md'>{name}</span>
                </span>
                <span className='px-3 py-2 md:pb-5 text-sm md:text-xl'>
                <span className='text-xs mx-3'>Code:</span> <span className='text-lg'> {code}</span>
                </span>
            </div>
            <span className='text-sm md:text-lg'>
                {TTL}
            </span>
        </div> : null
    )
}
