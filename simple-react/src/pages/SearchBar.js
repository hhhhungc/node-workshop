import React, { useState } from "react";
import Axios from "axios";

function SearchBar(props) {
    // table裡資料的初始值
    const [stock, setStock] = useState([]);
    // input的初始值
    const [stockNum, setStockNum] = useState("");

    // input的onChange事件
    const searchStock = (e) => {
        const searchWord = e.target.value;
        setStockNum(searchWord);
        // console.log(searchWord);

        Axios.get(`http://localhost:3001/stock/${searchWord}`).then((res) => {
            // console.log(res.data);
            setStock(res.data);
        });
    };

    return (
        <>
            <div className="container">
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">
                        請輸入股票代號
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="請輸入股票代號"
                        onChange={searchStock}
                    />
                </div>

                <h1>Stock: {searchStock ? stockNum : ""}</h1>
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
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default SearchBar;
