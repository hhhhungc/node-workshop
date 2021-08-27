import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";

function Stock(props) {
    // console.log(props);

    // table裡資料的初始值
    const [stock, setStock] = useState([]);
    const [stockName, setStockName] = useState([]);
    // 抓網址上的stock_id，用match要
    const stock_id = props.match.params.stock_id;

    useEffect(() => {
        Axios.get(`http://localhost:3001/stock/${stock_id}`).then((res) => {
            // console.log(res.data);
            setStock(res.data.result);
            setStockName(res.data.stock);
        });
    }, []);

    return (
        <>
            <div className="container">
                <h1>
                    Stock: {stock_id} {stockName.stock_name}
                </h1>
                <button
                    type="button"
                    className="btn btn-primary mb-2"
                    onClick={() => {
                        props.history.goBack();
                    }}
                >
                    回上一頁
                </button>
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
                        {stock.map((v, i) => {
                            return (
                                <tr key={i}>
                                    {/* <th>{v.stock_id}</th> */}
                                    <td className="text-end">{v.date}</td>
                                    <td className="text-end">{v.open_price}</td>
                                    <td>{v.high_price}</td>
                                    <td>{v.low_price}</td>
                                    <td>{v.close_price}</td>
                                    <td>{v.delta_price}</td>
                                    <td>{v.transactions}</td>
                                    <td>{v.volume}</td>
                                    <td>{v.amount}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default withRouter(Stock);
