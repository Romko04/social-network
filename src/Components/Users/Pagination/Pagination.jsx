import React, { useState } from "react"
import './pagination.css'
const Pagination = (props) => {
    let portionSize = 10 // по стільки сторінок має бути в
    const totalPages = Math.ceil(props.totalCount / props.pageSize) //скільки буде сторінок 20 4 порції
    const [portionNumber, setPortionNumber] = useState(Math.ceil(props.currentPage / portionSize))
    let totalPortion = Math.ceil(totalPages / portionSize)
    const leftPartNumber = (portionNumber - 1) * portionSize -1
    const rightPartNumber = portionNumber * portionSize
    let pages = [
    ]
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }
    let pagination = pages.filter(i => i > leftPartNumber && i < rightPartNumber).map(p => {
        return (
            <span key={p} onClick={() => { props.onChangePage(p) }} className={p === props.currentPage ? 'active pagination__item' : 'pagination__item'}>{p}</span>
        )
    })
    return (
    <div className="pagination">
        {portionNumber > 1 ? <button className="pagination__button" onClick={() => setPortionNumber(portionNumber - 1)}>Left</button> : null}
        {pagination}
        {totalPortion > portionNumber ? <button className="pagination__button" onClick={() => setPortionNumber(portionNumber + 1)}>Right</button> : null}
    </div>
    )
}
export default Pagination