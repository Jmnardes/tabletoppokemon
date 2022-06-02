function TableRow({tableTitle, tableValue}) {
    return (
        <div className="divTableRow">
            <div className="divTableCell">{tableTitle}</div>
            <div className="divTableCell">{tableValue}</div>
        </div>
    )
}

export default TableRow