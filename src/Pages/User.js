import React, { Component } from "react";
import Header_p from "../components/header_p";
import Logo from "../img/Logo_1.png"
import Footer from "../components/footer";
import Modal_name from "../components/Modal_name";
import axios from 'axios';

export default class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            firstname: "",
            lastname: null,
            surname: null,
            userSex: null,
            modalActive: false
            
            
        };
       
        
    }

    render() {
        if (localStorage.getItem('User')){
            
            setTimeout(()=>{
                const User = JSON.parse(localStorage.getItem('User'));
                this.setState({ username: User.username });
                this.setState({ email: User.email });
                this.setState({ firstname: User.firstname });
                this.setState({ lastname: User.lastname });
                this.setState({ surname: User.surname });
                this.setState({ userSex: User.userSex });
            }, 300)

        } else {
            putUser()
            
            setTimeout(()=>{
                getUser()
                const User = JSON.parse(localStorage.getItem('User'));
                this.setState({ username: User.username });
                this.setState({ email: User.email });
                this.setState({ firstname: User.firstname });
                this.setState({ lastname: User.lastname });
                this.setState({ surname: User.surname });
                this.setState({ userSex: User.userSex });
            }, 300)
        }

        return(
            <div className="personalAccount">
                <div>
                <Header_p image={Logo} />
                </div> 
                <h2>Моя учётная запись</h2>
                <div className="personalData">
                    <div className="field">
                        <p>Логин: {this.state.username}</p> 
                    </div>
                    <div className="field">
                        <p>Email: {this.state.email}</p>
                    </div>
                    <div className="field">
                        <p>Имя: {((this.state.firstname) === null) ? "Отсутствует" : this.state.firstname}</p>
                        
                    </div>
                    <div className="field">
                        <p>Фамилия:{((this.state.lastname) === null) ? "Отсутствует" : this.state.lastname}</p>
                        
                    </div>
                    <div className="field">
                        <p>Отчество: {((this.state.surname) === null) ? "Отсутствует" : this.state.surname}</p>
                    </div>
                    <div className="field">
                        <p>Пол: {((this.state.userSex) === null) ? "Отсутствует" : this.state.userSex}</p>
                    </div>
                    <button onClick={() => this.setState({modalActive: (!this.state.modalActive)})} >Изменить</button>
                </div>
                <div className="configuration">
                <h3>Настройки:</h3>
                    <div className="field">
                        <p>Предупреждать при закрытии страницы с несохранёными изминениями</p> <input type="checkbox"></input>
                    </div>
                    <div className="field">
                        <p>Уведомлять о изминениях на проектах, задачах и самом приложении </p> <input type="checkbox"></input>
                    </div>
                    
                    <button>Сохранить измнения</button>
                </div>
                
                <Footer/>
                <Modal_name active={this.state.modalActive} setActive={() => this.setState({modalActive: (!this.state.modalActive)})}
                 username={this.state.username} email={this.state.email} firstname={this.state.firstname} lastname={this.state.lastname} 
                 surname={this.state.surname} />
            </div>
        )
    }
}


async function getUser() {
    let JWT_a;
    if (localStorage.getItem('JWT_authorization')) {
        JWT_a =localStorage.getItem('JWT_authorization')
    }
    console.log(JWT_a)
    axios.get('http://localhost:8081/users/principal/profile', {
        headers: {
            'Authorization': 'Bearer '+JWT_a
        }}
        ).then(response =>{
        
        localStorage.setItem('User', JSON.stringify(response.data))
        

        
    }).catch(error => {console.error(error);
        alert("Что-то пошло не так. Попробуйте перезагругить страницу!");
        
    });   
    //return()
}

async function putUser() {
    let JWT_a;
    let json = {
        
    };
    if (localStorage.getItem('JWT_authorization')) {
        JWT_a =localStorage.getItem('JWT_authorization')
    }

    axios.put('http://localhost:8081/users/principal/profile', json, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+JWT_a
        }}
        ).then(response =>{
            //localStorage.setItem('User', JSON.stringify(response))
        

        
    }).catch(error => {console.error(error);
        alert("Что-то пошло не так. Попробуйте перезагругить страницу!");
        
    });   
    
}