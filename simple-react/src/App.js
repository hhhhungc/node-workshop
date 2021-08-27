import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Stock from "./pages/Stock";
import StockDetail from "./pages/StockDetail";
import SearchBar from "./pages/SearchBar";
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
                    {/* <Nav.Item>
                        <Nav.Link href="/stock-detail">StockDetail</Nav.Link>
                    </Nav.Item> */}
                    <Nav.Item>
                        <Nav.Link href="/searchBar">SearchBar</Nav.Link>
                    </Nav.Item>
                </Nav>
                {/* <Link to="/">Home</Link>
                <Link to="/stock">stock</Link>
                <Link to="/stock-detail">StockDetail</Link> */}

                <Switch>
                    <Route path="/stock-detail/:stock_id?">
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
