import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App1 from './App1';
import "./css/main.css"


const app = ReactDOMClient.createRoot(document.getElementById("regis"))
app.render(<App1 />)
