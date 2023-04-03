import { getDrops, setDROP } from '@/firebase'
import { setAlert } from '@/mixins'
import React, { useEffect, useState } from 'react'

export default function NavDrop() {
    const [hasCurrentDrop, setHasCurrentDrop] = useState(false)
    const [nextDrop, setNextDrop] = useState('')
    const [title, setTitle] = useState('')
    const [ttl, setTTL] = useState(new Date())

    useEffect(() => {
        getDrop()
    }, [])

    const getDrop = () => {
        getDrops().then((data) => {
            const res = data.val()
            if (res) {
                const validDrops = Object.values(res).filter((item) => {
                    return new Date(item.ttl) > new Date()
                })
                if (validDrops.length > 0) {
                    setHasCurrentDrop(true)
                    var x = setInterval(function () {
                        var now = new Date().getTime();
                        var distance = new Date(validDrops[validDrops.length - 1].ttl) - now;
                        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                        setNextDrop(`${days}:${hours}:${minutes}:${seconds}`);
                        if (distance <= 0) {
                            clearInterval(x)
                            setHasCurrentDrop(false)
                        }
                    }, 1000)
                } else {
                    setHasCurrentDrop(false)
                }
            }
        })
    }

    const DROP = () => {
        if (new Date(ttl) < new Date()) {
            setAlert('', 'Please select a future date.')
        } else if (title.trim().length < 1) {
            setAlert('', 'Title of the drop cannot be empty.')
        }    else {
            setDROP({
                uuid: new Date().toString(),
                title,
                ttl
            }).then(() => {
                getDrop()
                setAlert('', `Successfully Created ${title} drop`)
            })
        }
    }

    return (
        <div className="navbar-end lg:flex flex-row justify-end items-center space-x-2 hidden lg:visible">
            <span className='text-xs'> Next Drop: {hasCurrentDrop && nextDrop}</span>
            {
                !hasCurrentDrop && <div className='flex flex-row space-x-3'>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Drop title" className="w-1/3 input input-sm max-w-xs" />
                    <input value={ttl} onChange={(e) => setTTL(e.target.value)} type="datetime-local" placeholder="Type here" className="w-1/2 input input-sm max-w-xs" />
                    <button onClick={DROP} className="btn btn-outline btn-sm w-1/8">DROP</button>
                </div>
            }
        </div>
    )
}
