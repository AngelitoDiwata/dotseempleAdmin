import Head from 'next/head'
import { db } from '@/firebase'
import { ref, onValue } from "firebase/database";
import TableComponent from '@/components/TableComponent';
import { useState, useEffect } from 'react';
import Stats from '@/components/Stats';
import Nav from '@/components/Nav';

export default function Home() {

  const [list, setList] = useState([{}])
  const [codes, setCodes] = useState([{}])

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setList([]);
      setCodes([]);
      const res = snapshot.val();
      try {
        res.data !== undefined ? Object.values(res.data).map((entry) => {
          setList((oldArray) => [...oldArray, entry]);
        }) : setList([])
        res.codes !== undefined ? Object.values(res.codes).map((entry) => {
          setCodes((oldArray) => [...oldArray, entry]);
        }) : setCodes([])
      } catch (_) {

      }
    });

  }, []);

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
        <div className='p-3' >

          <Stats codes={codes} list={list} />
          {list && <TableComponent tableData={list} />}
        </div>
      </main>
    </>
  )
}
