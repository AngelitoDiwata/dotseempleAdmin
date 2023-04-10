import React, { useEffect, useState } from 'react'

export default function DropTable({ tableData }) {

    const [list, setList] = useState([])
    useEffect(() => {
        setList(Object.values(tableData))
    }, [tableData])
    return (
        <div className="overflow-x-auto">
            <table className="table table-compact w-full">
                <thead>
                    <tr>
                        {
                            Object.keys(list[0] || {['']: null}).map((title) => {
                                return <th>{title}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((entry) => {
                            return <tr>
                                {
                                    Object.keys(entry).map((key) => {
                                        return <td>{key === 'date' ? new Date(entry.date).toDateString() : entry[key]}</td>
                                    })
                                }
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
