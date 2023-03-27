import { resetAllPoints } from '@/firebase'
import { encryptHandle } from '@/mixins'
import React, { useEffect, useState } from 'react'

export default function TableComponent({ tableData }) {


    const [sortProp, setSortProp] = useState('')
    const [asc, setAsc] = useState(false)
    const [formModel, setFormModel] = useState({})
    /**
     * TODO
     * PRODUCTION DOMAIN
     */
    const domain = 'dotseemple-ego-dev.vercel.app'

    useEffect(() => {
        console.log('re-rendered table')
        if (tableData) {
            setSortProp(Object.keys(tableData[0] || {})[0])
        }
    }, [])

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

    const reset = () => {
        resetAllPoints()
    }

    return (
        <div className='w-full h-fit'>
            <div className='w-full grid grid-cols-2 gap-2 md:flex md:flex-row items-start justify-start my-3 md:space-x-3'>
                {
                    Object.keys(tableData[0] || {}).map((item) => {
                        return item !== 'collections' && item !== 'email' && item !== 'bio' && item !== 'role' && item !== 'wallet' && item !== 'connections' && <div key={item} className="form-control w-full md:w-1/6">
                            <label className="label">
                                <span className="label-text">Sort by {item}</span>
                            </label>
                            <input value={formModel[item]} onChange={(e) => setFormModel((prevData) => ({ ...prevData, [item]: e.target.value }))} type="text" placeholder={`Type ${item} here`} className="input input-bordered w-full" />
                        </div>
                    })
                }
            </div>
            <div className="w-full overflow-x-auto h-96 overflow-auto">
                <table className="table w-full">
                    <thead className='sticky top-0'>
                        <tr>
                            {
                                Object.keys(tableData[0] || {}).map((item) => {
                                    return item !== 'collections' && item !== 'bio' && item !== 'role' && item !== 'wallet' && <td key={item} className='cursor-pointer text-center text-neutral-600 dark:text-white  transition-all dark:hover:bg-neutral-900 hover:text-white' onClick={() => { setAsc(!asc); setSortProp(item) }}>{item}</td>
                                })

                            }
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sortParser().filter((item) => {
                                if (item.handle) {
                                    return item.handle.toUpperCase().includes(formModel.handle && formModel.handle.toUpperCase() || '') && item.email.includes(formModel.email || '') && item.uuid.includes(formModel.uuid || '') && item.wallet.includes(formModel.wallet || '')
                                }
                                return true
                            }).map((record, index) => {
                                return <tr key={index}>
                                    {
                                        Object.keys(tableData[0]).map((item) => {
                                            if (item === 'collections' || item === 'bio' || item === 'role' || item === 'wallet') {
                                                return null
                                            } else if (item === 'handle') {
                                                return <td className={`hover:font-bold hover:underline text-cyan-400 text-left transition-all ${item === 'connections' ? `font-bold text-2xl ${record[item] < 1 ? 'text-rose-600' : 'text-amber-500'}` : 'font-thin text-sm tracking-widest'}`} key={item}><a href={`https://twitter.com/${record[item].split('@')[1]}`} target="_blank">{record[item]}</a></td>
                                            } else if (item === 'connections') {
                                                return <td className={`text-center ${item === 'connections' ? `font-bold text-2xl ${record[item] < 1 ? 'text-rose-600' : 'text-amber-500'}` : 'font-thin text-sm tracking-widest'}`} key={item}>{record[item]}</td>
                                            } else if (item === 'email' || item === 'handle' || item === 'uuid') {
                                                return <td className={`text-center ${item === 'connections' ? `font-bold text-2xl ${record[item] < 1 ? 'text-rose-600' : 'text-amber-500'}` : 'font-thin text-sm tracking-widest'}`} key={item}>{record[item]}</td>
                                            }
                                        })
                                    }
                                    <td className={`text-cyan-400`} key={index}>{record.email && record.email.length > 0 ? <div className="badge badge-accent">Registered!</div> : <a href={`http://${domain}/register/${encryptHandle(record.handle && record.handle.toUpperCase())}`} target="_blank">{'Register link'}</a>}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>

    )
}
