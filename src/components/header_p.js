import React from 'react';
import Button from './Button';
import { VscAccount } from "react-icons/vsc";
//import "../css/main.css"
import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink
} from "react-router-dom";

class Header_p extends React.Component {
    render () {
      return (
        <header className='header'>
        <div className='Logo_div'>
        
            <img className='logo' src={this.props.image} alt='Лого'>
            </img>
        </div>
        <div className='Head_buttom'>
        <NavLink to="/Projects" activeClassName="active" >
            <Button text="Проекты" />
        </NavLink>
        <NavLink to="/Tasks" activeClassName="active" >
            <Button text="Задачи" />
        </NavLink>
        <NavLink to="/History" activeClassName="active" >
            <Button text="История" />
        </NavLink>
        <NavLink to="/User" activeClassName="active" >
            <VscAccount className='User_icon'/>
        </NavLink>
        </div>
        </header>
      )
    }
  }

  export default Header_p