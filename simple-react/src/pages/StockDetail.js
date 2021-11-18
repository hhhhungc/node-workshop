import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../utils/config";
import { Pagination, Button } from "react-bootstrap";

function Stock(props) {
    // console.log(props);
    // 抓網址上的stock_id，用match要
    // const stock_id = props.match.params.stock_id;

    // useParams抓這個參數，抓到會是字串
    const { stock_id, currentPage } = useParams();
    
    // table裡資料的初始值
    const [stock, setStock] = useState([]);
    const [stockName, setStockName] = useState([]);

    // 分頁屬性
    const [page, setPage] = useState(parseInt(currentPage) || 1);
    // 總共有幾頁
    const [totalPage, setTotalPage] = useState(0);

    const history = useHistory();

    // let active = page;
    let pages = [];
    for (let i = 1; i <= totalPage; i++) {
        pages.push(
            <Pagination.Item
                key={i}
                active={i === page}
                onClick={(e) => {
                    setPage(i);
                }}
            >
                {i}
            </Pagination.Item>
        );
    }

    // const getPages = () => {
    //     let pages = [];
    //     for (let i = 1; i <= totalPage; i++) {
    //         pages.push(
    //             <li
    //                 key={i}
    //                 onClick={() => {
    //                     setPage(i);
    //                 }}
    //             >
    //                 {i}
    //             </li>
    //         );
    //     }
    //     return pages;
    // };

    useEffect(() => {
        const getStockData = async () => {
            try {
                let res = await Axios.get(
                    `${API_URL}/stock/${stock_id}/?page=${page}`,
                    {
                        withCredentials: true,
                    }
                );
                // console.log(res.data);
                setStock(res.data.result);
                setStockName(res.data.stock);

                //設定分頁
                setTotalPage(res.data.pagination.totalPage);
                history.push(`/stock/${stock_id}/${page}`);
            } catch (e) {
                console.log(e);
            }
        };
        getStockData();
    }, [page]);
    // [] --> 只有第一次render的時候才觸發
    // [page] --> page變的時候 --> render --> 這個effect被觸發

    return (
        <>
            <div className="container">
                <h1>
                    Stock: {stock_id} {stockName.stock_name}
                </h1>
                <div className="d-flex justify-content-between align-items-center">
                    <Pagination>{pages}</Pagination>

                    {/* <ul>{getPages()}</ul> */}
                    <Button
                        variant="primary"
                        onClick={() => {
                            props.history.goBack();
                        }}
                    >
                        回上一頁
                    </Button>
                </div>
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

export default Stock;
