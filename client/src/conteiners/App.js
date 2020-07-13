import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import {AddForm} from "../components/AddForm";
import {CurrentTable} from "../components/Table";
import {Header} from "../components/Header"
import './App.css';

function App() {
    return (
        <div className={'App'}>
            <Router>
                <Header/>
                <Switch>
                    <Route exact path='/' component={CurrentTable}/>
                    <Route exact path='/create' component={AddForm}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;