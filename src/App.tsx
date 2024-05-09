import { useEffect, useState } from 'react';
import './App.scss';
import Logo from './Assets/Logo';

const App = () => {
    const [example, setExample] = useState(0);

    useEffect(() => {
        setExample(1);
    },[])

    return (
        <div className="App">
            <header className="App-header">
                <Logo className={'App-logo'}/>
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