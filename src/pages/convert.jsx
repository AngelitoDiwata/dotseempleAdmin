import Head from 'next/head'
import TableComponent from '@/components/TableComponent';
import { db } from '@/firebase'
import { set, ref, remove } from "firebase/database";
import Nav from '@/components/Nav';
import { useState } from 'react';
import swal from 'sweetalert';

export default function convert() {

    const [list, setList] = useState([])
    const [alertStatus, setAlertStatus] = useState(false)
    const [errorStatus, setErrorStatus] = useState(false)

    const setAlert = (title, message) => {
        swal({
            title: title,
            text: message,
            timer: 2500,
            showCancelButton: false,
            button: false
        }).then(
            function () { },
            function (dismiss) {
                if (dismiss === 'timer') {
                }
            });
    }

    function getData(e) {
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            console.log('The File APIs are not fully supported in this browser.');
            return;
        }

        if (!e.target.files) {
            console.log("This browser doesn't seem to support the `files` property of file inputs.");
        } else if (!e.target.files[0]) {
            console.log("No file selected.");
        } else {
            let file = e.target.files[0];
            let fr = new FileReader();
            fr.onload = receivedText;
            fr.readAsText(file);
            function receivedText() {
                setList(fr.result.split('\r\n').map((item) => {
                    return {
                        uuid: window.crypto.randomUUID(),
                        handle: item,
                        connections: 0,
                        email: '',
                        wallet: ''
                    }
                }));
                // Do additional processing here
            }
        }
    }

    function submitData(format = false) {
        if (list.length > 0) {
            if (format === true) {
                remove(ref(db, `/data`))
            }
            list.forEach(async (item) => {
                await set(ref(db, `/data/${item.uuid}`), item)
            })
            setAlert('', `${list.length} items added to the database!`)
        } else {
            setAlert('', 'Please select a CSV file!')
        }
    }

    return (
        <>
            <Head>
                <title>Dotseemple Admin</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className='w-full'>
                <Nav />
                <div className='p-3'>
                    <div className='w-full flex flex-row items-center justify-between my-2 mx-2 space-x-3'>
                        <div className='flex flex-row items-center justify-center'>

                            <input onChange={getData} accept=".csv" type="file" className="file-input file-input-bordered w-full max-w-xs" />
                            <span className='p-3 text-xs'>Use your handle CSVs directly to be <br /> formatted/appended to database</span>
                        </div>
                        <div className='flex flex-row items-center justify-center space-x-3 px-5'>
                            <button onClick={() => submitData()} className="btn btn-primary">Append to DB</button>
                            <button  onClick={() => submitData(true)} className="btn btn-secondary">Format DB</button>
                        </div>
                    </div>
                    {list ? <TableComponent tableData={list} /> : <span>No file selected.</span>}
                </div>
            </main>
        </>
    )
}
