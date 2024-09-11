import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Pagination() {

  const [tableData, setTableData] = useState();
  const [currPage, setCurrPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const indexOfLastPage = currPage * rowsPerPage;
  const indexOfFirstPage = indexOfLastPage - rowsPerPage;
  const currTableData = tableData?.users?.slice(indexOfFirstPage, indexOfLastPage);
  const totalPage = Math.ceil(tableData?.total / rowsPerPage);
  const pageLimit = 10;
  const startPage = Math.max(1, currPage - Math.floor(pageLimit / 2));
  const endPage = Math.min(totalPage, startPage + pageLimit - 1);

  useEffect(() => {
    axios.get('https://dummyjson.com/users?limit=0')
      .then((response) => {
        setTableData(response?.data);
      });
    console.log(tableData);
  }, []);

  const handlePage = (pageNumber) => {
    setCurrPage(pageNumber);
  };

  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>GENDER</th>
              <th>AGE</th>
            </tr>
          </thead>
          <tbody>
            {currTableData?.map((row, index) => (
              <tr key={index}>
                <td>{row.firstName}</td>
                <td>{row.lastName}</td>
                <td>{row.gender}</td>
                <td>{row.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {startPage > 1 && (<button onClick={() => handlePage(currPage - 1)}>Prev</button>)}
          {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
            const page = startPage + index;
            return (
              <button
                key={page}
                onClick={() => handlePage(page)}
                className={currPage === page ? 'active' : ''}
              >
                {page}
              </button>
            );
          })}
          {endPage < totalPage && (
            <button onClick={() => handlePage(currPage + 1)}>Next</button>
          )}
        </div>
      </div>
    </>
  )
}

export default Pagination