import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function Stock(props) {
    const [list, setList] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/stock").then((res) => {
            // console.log(res.data);
            setList(res.data);
        });
    }, []);

    return (
        <>
            <div className="container">
                <h1>Stock List</h1>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>股票代號</th>
                            <th>股票名稱</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((v, i) => {
                            return (
                                <tr key={i}>
                                    <th>
                                        <Link
                                            to={"/stock-detail/" + v.stock_id}
                                        >
                                            {v.stock_id}
                                        </Link>
                                    </th>
                                    <th>{v.stock_name}</th>
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
