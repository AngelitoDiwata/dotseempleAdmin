import React, { useEffect, useState } from 'react'

export default function TableComponent({ tableData }) {


    const [sortProp, setSortProp] = useState('')
    const [asc, setAsc] = useState(false)
    const [formModel, setFormModel] = useState({})

    useEffect(() => {
        if (tableData) {
            setSortProp(Object.keys(tableData[0])[0])
        }
    }, [tableData])

    const sortParser = () => {
        var result = tableData.sort(function (_a, _b) {
            const a = _a[sortProp];
            const b = _b[sortProp];
            if (asc ? a <= b : a >= b) {
                return 1;
            } else if (asc ? a > b : a < b) {
                return -1;
            }
        });
        return result
    }

    return (
        <div className="overflow-x-auto w-full">
            <div className='w-full flex flex-row items-start justify-start my-3 space-x-3'>
                {
                    Object.keys(tableData[0]).map((item) => {
                        return item !== 'collections' && item !== 'connections' && <div key={item} className="form-control w-full md:w-1/6">
                            <label className="label">
                                <span className="label-text">Sort by {item}</span>
                            </label>
                            <input value={formModel[item]} onChange={(e) => setFormModel((prevData) => ({ ...prevData, [item]: e.target.value }))} type="text" placeholder={`Type ${item} here`} className="input input-bordered w-full max-w-xs" />
                        </div>
                    })
                }

            </div>

            <table className="table w-full">
                <thead>
                    <tr>
                        {
                            Object.keys(tableData[0]).map((item) => {
                                return item !== 'collections' && <th key={item} className='cursor-pointer text-center text-2xl  transition-all hover:bg-neutral-900' onClick={() => { setAsc(!asc); setSortProp(item) }}>{item}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        sortParser().filter((item) => {
                            if (item.handle) {
                                return item.handle.includes(formModel.handle || '') && item.email.includes(formModel.email || '') && item.uuid.includes(formModel.uuid || '') && item.wallet.includes(formModel.wallet || '')  
                            }
                            return true
                        }).map((record, index) => {
                            return <tr key={index}>
                                {
                                    Object.keys(tableData[0]).map((item) => {
                                        if (item === 'collections') {
                                            return null
                                        } else if (item === 'connections') {
                                            <th className={`text-center ${item === 'connections' ? `font-bold text-2xl ${ record[item] < 1 ?'text-rose-600' : 'text-amber-500'}` : 'font-thin text-sm tracking-widest'}`} key={item}>{record[item]}</th>
                                        }
                                        return <td className={`text-center ${item === 'connections' ? `font-bold text-2xl ${ record[item] < 1 ?'text-rose-600' : 'text-amber-500'}` : 'font-thin text-sm tracking-widest'}`} key={item}>{record[item]}</td>
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
