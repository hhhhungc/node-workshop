import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Stock from "./pages/Stock";
import StockDetail from "./pages/StockDetail";
import SearchBar from "./pages/SearchBar";
import Register from "./pages/Register";
import NotFoundPage from './pages/NotFoundPage'

import Nav from "react-bootstrap/Nav";

function App() {
    return (
        <>
            <Router>
                <Nav>
                    <Nav.Item>
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/stock">stock</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/register">Register</Nav.Link>
                    </Nav.Item>
                </Nav>

                <Switch>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/stock-detail/:stock_id">
                        <StockDetail />
                    </Route>
                    <Route path="/searchBar">
                        <SearchBar />
                    </Route>
                    <Route path="/stock">
                        <Stock />
                    </Route>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    {/* 404 */}
                    <Route path="*">
                        <NotFoundPage />
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
