import React from 'react'
import CodeCard from './CodeCard'

export default function CodeTable({ listData }) {
    return (
        <div className="overflow-x-auto w-11/12 h-96 mx-auto">
            <table className="table w-full">
                {/* head */}
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Actual Code</th>
                        <th>TTL {"(Time to live)"}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listData.map((item, index) => {
                            return <CodeCard key={index} name={item.name} code={item.code} date={new Date(item.ttl)} />
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
