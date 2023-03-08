import React, { useEffect, useState } from 'react'

export default function Stats({ list, codes }) {
    const [subscribed, setSubscribed] = useState(0)
    const [unsubscribed, setUnsubscribed] = useState(0)
    const [inactive, setInactive ] = useState(0)
    useEffect(() => {
        const popSubd = list.filter((user) => {
            return user.connections > 0 && user.wallet !== '' && user.email !== ''
        }).length

        const popUnSubd = list.filter((user) => {
            return user.connections === 0 && user.wallet !== '' && user.email !== ''
        }).length

        const popInactive = list.filter((user) => {
            return user.wallet === '' && user.email === ''
        }).length

        const popTotal = list.length
        setSubscribed(Math.round((popSubd * 100) / popTotal))
        setUnsubscribed(Math.round((popUnSubd * 100) / popTotal))
        setInactive(Math.round((popInactive * 100) / popTotal))
    }, [list])
    return (
        <div className="stats shadow w-full">
            <div className="stat">
                <div className="stat-figure text-green-500 text-6xl">
                    ⦿
                </div>
                <div className="stat-title">Users subscribed</div>
                <div className="stat-value text-white">{subscribed}%</div>
                <div className="stat-desc">registered and subscribed</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-red-300 text-6xl">
                ⦾
                </div>
                <div className="stat-title">Users not subscribed</div>
                <div className="stat-value text-white">{unsubscribed}%</div>
                <div className="stat-desc">not subscribed but registered</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-red-300 text-6xl">
                !
                </div>
                <div className="stat-title">Users not active</div>
                <div className="stat-value text-white">{inactive}%</div>
                <div className="stat-desc">not registered {"(No email and wallet addy)"}</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-amber-500 text-4xl">
                    ⌘
                </div>
                <div className="stat-title">CODES launched</div>
                <div className="stat-value text-white">{codes.length}%</div>
                <div className="stat-desc">so far</div>
            </div>

        </div>

    )
}
