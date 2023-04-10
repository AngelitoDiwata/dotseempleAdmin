import React, { useEffect } from 'react'
import { useState } from 'react';

export default function ExpDefinition({ keyName, date }) {
    const [TTL, setTTL] = useState('')

    useEffect(() => {
        setInterval(() => {
            const setDate = new Date(date)
            setTTL(msToTime(setDate.setDate(setDate.getDate() + 2) - new Date()))
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
    <td key={keyName}>{TTL}</td>
  )
}
