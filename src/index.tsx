import * as React from "react";
import * as ReactDOM from "react-dom";
import { Main } from './components/Main';

ReactDOM.render(<div>
        <nav>
            <a href="#">Book Database</a>
        </nav>
        <Main/>
        <div id="main" className="cards">
            <section className="card">
                <h1> About </h1>
                <p>This is a book database manager using a <a href="https://www.forverkliga.se/JavaScript/api/crud.php">public API</a>.</p>
            </section>
        </div>
        <div className="cards">
            <div className="card">
                Created by <a href="https://github.com/wilhelmberggren">Wilhelm Berggren</a>
            </div>
            <div className="card">
                <a href="https://github.com/wilhelmberggren/BookShop-SPA">Source</a>
            </div>
        </div>
    </div>,
    document.getElementById('react'));