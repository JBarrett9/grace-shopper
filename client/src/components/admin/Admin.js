import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AddData from './AddData';
import "./Admin.css"
import Edit from './Edit'
import Pizzas from './Pizzas';

const Admin = ({sizes, crusts}) => {
    return (
        <div className='Admin'>
            <aside>
                <Link to="">Pizzas</Link>
                
            </aside>
            <main>
                <Routes>
                    <Route path='/' element={<Pizzas sizes={sizes} crusts={crusts}/>} />
                    <Route path=':addData' element={<AddData/>} />
                    <Route path='/edit' element={<Edit sizes={sizes} crusts={crusts}/>} />
                </Routes>
            </main>
        </div>
    );
}

export default Admin;