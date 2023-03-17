import React, { useEffect, useState } from 'react'
import TableComponent from './TableComponent'

export default function DupeDetector({ list }) {
    const [dupes, setDupes] = useState([{}])

    useEffect(() => {
        setDupes(findDuplicates(list))
    }, [list])


    const keepDupsBy = (eq) => (xs) => xs.filter(
        (x, i) => xs.find((y, j) => i !== j && eq(x, y))
    )

    const findDuplicates = keepDupsBy((a, b) =>
        a.uuid.trim() == b.uuid.trim()
    )
    return (
        <TableComponent tableData={dupes} />
    )
}
