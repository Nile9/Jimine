import React, { Component }  from 'react';

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Tasks from "./Pages/Tasks";
import User from "./Pages/User";
import Projects from "./Pages/Projects";
import App from './App';
import History from './Pages/History';
import Project_Inf from './Pages/Project_Inf'


function App1 () {
    
    return (
        <Router>
        <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/Projects" element={<Projects/>}/>
                <Route path='/Projects/:id' element={<Project_Inf/>}/>
                <Route path="/User" element={<User/>}/>
                <Route path="/Tasks" element={<Tasks/>}/>
                <Route path="/History" element={<History/>}/>
        </Routes>
        </Router>
      )
    }


export default App1 