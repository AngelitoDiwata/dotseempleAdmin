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
        !TTL.toString().includes('-') ? <tr>
            <th>{name}</th>
            <td>{code}</td>
            <td>{TTL}</td>
        </tr> : null
    )
}
