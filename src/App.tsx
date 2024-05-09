import { useEffect, useState } from 'react';
import './App.scss';
import logo from './Assets/logo.svg';

const App = () => {
    const [example, setExample] = useState(0);

    useEffect(() => {
        setExample(1);
    },[])

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
                >
                Learn React
                </a>
            </header>
        </div>
    )
}

export default App;