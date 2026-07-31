import './App.css';

import React from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = ()=> {
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<News key = 'Home' coutry='us' category='business'/>} />
            {/* <Route exact path="/about" element={<News key = 'Home' coutry='us' category='business'/>} /> */}
            <Route exact path="/business" element={<News key = 'business' coutry='us' coutry='us' category='business'/>} />
            <Route exact path="/entertainment" element={<News key = 'entertainment' coutry='us' category='entertainment'/>} />
            <Route exact path="/general" element={<News key = 'general' coutry='us' category='general'/>} />
            <Route exact path="/health" element={<News key = 'health' coutry='us' category='health'/>} />
            <Route exact path="/science" element={<News key = 'science' coutry='us' category='science'/>} />
            <Route exact path="/sports" element={<News key = 'sports' coutry='us' category='sports'/>} />
            <Route exact path="/technology" element={<News key = 'technology' coutry='us' category='technology'/>} />
        </Routes>
      </Router>
      </div>
    )
}

export default App
