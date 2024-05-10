import { useEffect, useState } from 'react';
import './App.scss';
import logo from './Assets/logo.svg';
import Classification from 'Component/Classification';

const App = () => {
    const [example, setExample] = useState(0);

    useEffect(() => {
        setExample(1);
    },[])

    return (
        <div className="App">
            <Classification/>
        </div>
    )
}

export default App;