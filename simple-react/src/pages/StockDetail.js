import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'

function Stock(props) {
  const [list, setList] = useState([])

  useEffect(() => {
    Axios.get('http://localhost:3001/stock/' + 2330).then((res) => {
      // console.log(res.data);
      setList(res.data)
    })
  }, [])

  return (
    <>
      <h1>Stock: 2330</h1>
      <div className="container">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              {/* <th>股票代號</th> */}
              <th>日期</th>
              <th>開盤價</th>
              <th>最高價</th>
              <th>最低價</th>
              <th>收盤價</th>
              <th>漲跌價差</th>
              <th>成交筆數</th>
              <th>成交金額</th>
              <th>成交股數</th>
            </tr>
          </thead>
          <tbody>
            {list.map((v, i) => {
              return (
                <tr key={i}>
                  {/* <th>{v.stock_id}</th> */}
                  <th>{v.date}</th>
                  <td>{v.open_price}</td>
                  <td>{v.high_price}</td>
                  <td>{v.low_price}</td>
                  <td>{v.close_price}</td>
                  <td>{v.delta_price}</td>
                  <td>{v.transactions}</td>
                  <td>{v.volume}</td>
                  <td>{v.amount}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default withRouter(Stock)
