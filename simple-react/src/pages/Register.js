import React, { useState } from "react";
import Axios from "axios";
import { API_URL } from "../utils/config";

function Register() {
    const [email, setEmail] = useState("ruby@test.com");
    const [name, setName] = useState("Ruby");
    const [password, setPassword] = useState("tester");
    const [confirmPassword, setConfirmPassword] = useState("tester");
    const [photo, setPhoto] = useState("");

    // const [fields, setFields] = useState({
    //     email: "ruby@test.com",
    //     name: "Ruby",
    //     password: "tester",
    //     confirmPassword: "tester",
    //     photo: "",
    // });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // /auth/register
            // /auth/login
            // 不需要上傳檔案的版本  
            // Content-Type: application/json
            // let res = await Axios.post(`${API_URL}/auth/register`, {
            //     name,
            //     email,
            //     password,
            //     confirmPassword,
            // });
            // console.log(res);

            // 需要上傳檔案的版本，透過FormData
            // Content-Type: multipart/form-data
            // express需要用到另外的中間件
            let formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("confirmPassword", confirmPassword);
            formData.append("photo", photo);
            let res = await Axios.post(`${API_URL}/auth/register`, formData);
            console.log(res);
        } catch (e) {
            // 可以用e.response 拿到axios的response
            console.error(e.response);
            // 如何顯示這個訊息(UX)
            alert(e.response.data.message);
        }
    };
    return (
        <>
            <div className="container">
                <h1>會員註冊</h1>
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
                            <label htmlFor="name" className="form-label">
                                姓名
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
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
                        <div className="mb-3">
                            <label
                                htmlFor="confirmPassword"
                                className="form-label"
                            >
                                確認密碼
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="photo" className="form-label">
                                上傳照片
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                id="photo"
                                name="photo"
                                onChange={(e) => {
                                    setPhoto(e.target.files[0]);
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
