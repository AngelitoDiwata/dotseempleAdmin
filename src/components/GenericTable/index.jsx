import React from 'react'

export default function GenericTable({ tableData, ignoreCols = [], onSelect, selectable = true }) {
    return (
        <div className="overflow-auto h-screen mt-5">
            <table className="table w-full">
                <thead>
                    <tr>
                        {
                            Object.keys(tableData[0]).filter((key) => !ignoreCols.includes(key)).map((key, index) => <th key={index}>{key.replaceAll('_', ' ')}</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        tableData.map((item, ind) => {
                            return <tr className='cursor-pointer' onClick={() => selectable && onSelect(item)} key={ind}>
                                {
                                    Object.keys(item).filter((key) => !ignoreCols.includes(key)).map((key, index) => <td key={index}>{item[key]}</td>)
                                }
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
