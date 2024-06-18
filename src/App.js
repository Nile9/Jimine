import React, { Component, useEffect }  from 'react';
import { CSSTransition } from 'react-transition-group';
import Authorization from './components/authorization';
import Registration from './components/registration';
import Header from './components/header';
import Logo from "./img/Logo_1.png"
import Button from './components/Button';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink
} from "react-router-dom";
import { useCookies } from 'react-cookie';



class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usernameOrEmail: "",
            email: "",
            password: "",
            password_2: "",
            full_name: "",
            shou: false,
            nameDirty: false,
            emailDirty: false,
            passwordDirty: false,
            full_nameDirty: false,
            nameError: "Логин заполнин не верно!",
            emailError: "Email заполнин не верно!",
            passwordError: "Пароль заполнин не верно!",
            full_nameError: "ФИО заполнин не верно!",

        }

        this.handleChangeUser = this.handleChangeUser.bind(this)
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.handleChangePassword_2 = this.handleChangePassword_2.bind(this)
        this.handleChangeFullName = this.handleChangeFullName.bind(this)

        
    }
    handleChangeUser(event) {
        this.setState({
            usernameOrEmail: event.target.value
        })
        if(event.target.value.length < 4 || event.target.value.length > 15){
            this.setState({nameDirty: true})
        } else {
            this.setState({nameDirty: false})
        }
    }
    handleChangeEmail(event) {
        this.setState({
            email: event.target.value
        })
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!re.test(String(event.target.value).toLowerCase())){
            this.setState({emailDirty: true})
        } else {
            this.setState({emailDirty: false})
        }
    }
    handleChangePassword(event) {
        this.setState({
            password: event.target.value
        })
        if(event.target.value.length < 4 || event.target.value.length > 15){
            this.setState({passwordDirty: true})
        } else {
            this.setState({passwordDirty: false})
        }
    }
    handleChangePassword_2(event) {
        this.setState({
            password_2: event.target.value
        })
        setTimeout(()=>{
            if(this.state.password === this.state.password_2){
                this.setState({passwordDirty: false})
            } else {
                this.setState({passwordDirty: true})
            }
        }, 300)
        
    }
    handleChangeFullName(event) {
        this.setState({
            full_name: event.target.value
        })
        if(event.target.value.length < 4 || event.target.value.length > 64){
            this.setState({full_nameDirty: true})
        } else {
            this.setState({full_nameDirty: false})
        }
    }
    
    




    
    render () {
      return (
        //<Router>
        <div className="App">
            <div>
                <Header image={Logo} />
            </div> 
            <CSSTransition in={(!this.state.shou)} timeout={900} classNames='alert' >
            <div className='form_r_a animation'>
                
                
                {this.state.shou ? <Registration 
                handleChangeEmail={this.handleChangeEmail} handleChangePassword_2={this.handleChangePassword_2} handleChangeFullName={this.handleChangeFullName} 
                handleChangePassword={this.handleChangePassword} handleChangeUser={this.handleChangeUser} usernameOrEmail={this.state.usernameOrEmail} 
                password={this.state.password} Email={this.state.handleChangeEmail} password_2={this.state.password_2} full_name={this.state.full_name}
                nameDirty={this.state.nameDirty} emailDirty={this.state.emailDirty} passwordDirty={this.state.passwordDirty} full_nameDirty={this.state.full_nameDirty}
                nameError={this.state.nameError} emailError={this.state.emailError} passwordError={this.state.passwordError} full_nameError={this.state.full_nameError}
                /> : <Authorization 
                handleChangePassword={this.handleChangePassword} handleChangeUser={this.handleChangeUser} usernameOrEmail={this.state.usernameOrEmail} 
                password={this.state.password} nameDirty={this.state.nameDirty} passwordDirty={this.state.passwordDirty} nameError={this.state.nameError}
                passwordError={this.state.passwordError}
                />}
                <div className='form_buttom'>
                <div>
                    <NavLink to="/Projects" activeClassName="active" >
                    <Button  text={this.state.shou ? "Регистрироватся" : "Авторизаватся"}  
                    function={this.state.shou ? (e) => postDataB(this.state.usernameOrEmail, this.state.email, this.state.password) : 
                    (e) => postDataA(this.state.usernameOrEmail, this.state.email, this.state.password) } />
                    </NavLink>
                </div>
                    <div className='divider'>
                        или
                    </div>
                    <div className="buttom_change">
                        <Button text={this.state.shou ? "Авторизаватся" : "Регистрироватся"} function={() => this.setState({shou: (!this.state.shou)})} />
                    </div>
                    
                    
                </div>
            </div>
            </CSSTransition>
            
            
        </div>
        
        //</Router>
      )
    }
 
  }
  
  
 
 


  async function postDataA(usernameOrEmail, email, password) {

    console.log(usernameOrEmail, email, password)
    let json = {
        "usernameOrEmail": ""+usernameOrEmail,
        //"email": ""+email,
        "password": ""+password
    };
    axios.post('http://localhost:8081/auth/sign-in', json, {
        headers: {
            'Content-Type': 'application/json'
        }}
        ).then(response =>{
        console.log(response.data.token);

        localStorage.setItem('JWT_authorization', response.data.token)
        document.cookie = "JWT="+response.data.token;

        
    }).catch(error => {console.error(error);
        alert("Что-то пошло не так. Попробуйте перезагругить страницу!");
        
    });   
    }
    
    async function postDataB(usernameOrEmail, email, password) {
        
        let json = {
            "usernameOrEmail": ""+usernameOrEmail,
            "email": ""+email,
            "password": ""+password
        };
        axios.post('http://localhost:8081/auth/sign-up', json, {
            headers: {
                'Content-Type': 'application/json'
            }}
            ).then(response =>{
           
            localStorage.setItem('JWT_authorization', response.data.token)
            document.cookie = "JWT="+response.data.token
        }).catch(error => {console.error(error);
            alert("Что-то пошло не так. Попробуйте перезагругить страницу!");
        });   
    }

  export default App 
  

  