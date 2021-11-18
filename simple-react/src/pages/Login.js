import React, { useState } from "react";
import Axios from "axios";
import { API_URL } from "../utils/config";

function Register() {
    const [email, setEmail] = useState("ruby@test.com");
    const [password, setPassword] = useState("tester");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await Axios.post(
                `${API_URL}/auth/login`,
                // 設定跨源存取cookie
                {
                    email,
                    password,
                },
                { withCredentials: true }
            );
        } catch (e) {
            // 可以用e.response 拿到axios的response
            console.error(e.response);
            // 如何顯示這個訊息(UX)
            // alert(e.response.data.message);
        }
    };
    return (
        <>
            <div className="container">
                <h1>會員登入</h1>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                密碼
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            送出
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;
