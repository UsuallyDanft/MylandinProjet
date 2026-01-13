import React from 'react'
import Layout from './components/Layout/layout'
import HomePage from './pages/HomePage';
import About from './pages/About';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path='/' element={<HomePage />}></Route>
                <Route path='/about' element={<About />}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
