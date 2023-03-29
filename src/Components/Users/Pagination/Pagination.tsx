import React, { useState } from "react"
import './pagination.css'
type paginationPropsType = {
    totalCount:number
    pageSize:number
    currentPage:number
    onChangePage: (p:number)=>void
}
const Pagination: React.FC<paginationPropsType> = ({totalCount,pageSize,currentPage,onChangePage}) => {
    let portionSize = 10 // по стільки сторінок має бути в
    const totalPages = Math.ceil(totalCount / pageSize) //скільки буде сторінок 20 4 порції
    const [portionNumber, setPortionNumber] = useState(Math.ceil(currentPage / portionSize))
    let totalPortion = Math.ceil(totalPages / portionSize)
    const leftPartNumber = (portionNumber - 1) * portionSize -1
    const rightPartNumber = portionNumber * portionSize
    let pages: number[] = [
    ]
    for (let i:number = 1; i <= totalPages; i++) {
        pages.push(i)
    }
    let pagination = pages.filter(i => i > leftPartNumber && i < rightPartNumber).map(p => {
        return (
            <span key={p} onClick={() => { onChangePage(p) }} className={p === currentPage ? 'active pagination__item' : 'pagination__item'}>{p}</span>
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