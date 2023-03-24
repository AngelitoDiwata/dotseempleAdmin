import React, { useEffect, useState } from 'react'

/**
 * RESET AMOUNT TO PLUS 21 before production
 */
export default function Stats({ list, codes }) {
    const [subscribed, setSubscribed] = useState(0)
    const [unsubscribed, setUnsubscribed] = useState(0)
    const [active, setActive] = useState(0)
    const [total, setTotal] = useState(0)
    useEffect(() => {
        const popSubd = list.filter((user) => {
            return user.connections > 0
        }).length

        const popUnSubd = list.filter((user) => {
            return user.connections === 0
        }).length

        const popActive = list.filter((user) => {
            return user.email && user.email.length > 0
        }).length

        const popTotal = list.length
        setTotal(popTotal)
        setSubscribed(Math.round((popSubd * 100) / popTotal))
        setUnsubscribed(Math.round((popUnSubd * 100) / popTotal))
        setActive(Math.round((popActive * 100) / popTotal))
    }, [list])
    return (
        <div className="stats shadow w-full">
            <div className="stat">
                <div className="stat-figure font-semibold text-amber-500 text-5xl">
                    Σ
                </div>
                <div className="stat-title">We have</div>
                <div className="stat-value text-netral-800 dark:text-white">{total.toString()}</div>
                <div className="stat-desc">users overall</div>
            </div>
            <div className="stat">
                <div className="stat-figure text-green-500 text-6xl">
                    ✓
                </div>
                <div className="stat-title">Users Active</div>
                <div className="stat-value text-netral-800 dark:text-white">{active}%</div>
                <div className="stat-desc">accounts registered</div>
            </div>
            <div className="stat">
                <div className="stat-figure text-green-500 text-6xl">
                    ⦿
                </div>
                <div className="stat-title">Users subscribed</div>
                <div className="stat-value text-netral-800 dark:text-white">{subscribed}%</div>
                <div className="stat-desc">registered and subscribed</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-red-300 text-6xl">
                    ⦾
                </div>
                <div className="stat-title">Users not subscribed</div>
                <div className="stat-value text-netral-800 dark:text-white">{unsubscribed}%</div>
                <div className="stat-desc">not subscribed but registered</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-amber-500 text-4xl">
                    ⌘
                </div>
                <div className="stat-title">CODES launched</div>
                <div className="stat-value text-netral-800 dark:text-white">{(codes.length).toString()}</div>
                <div className="stat-desc">so far</div>
            </div>

        </div>

    )
}
