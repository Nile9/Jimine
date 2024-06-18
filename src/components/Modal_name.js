import React, { Component } from "react";
import Button from "./Button";
import axios from 'axios';


export default class Modal extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username: "",
        email: "",
        firstname: "",
        lastname: "",
        surname: "",
        userSex: "",
        check: true
      }
      this.handleChangeUsername = this.handleChangeUsername.bind(this)
      this.handleChangeEmail = this.handleChangeEmail.bind(this)
      this.handleChangeFirstname = this.handleChangeFirstname.bind(this)
      this.handleChangeLastname = this.handleChangeLastname.bind(this)
      this.handleChangeSurname = this.handleChangeSurname.bind(this)
      this.handleChangeUserSex = this.handleChangeUserSex.bind(this)
    }
    handleChangeUsername(event) {
        this.setState({
            username: event.target.value
        })
    }
    handleChangeEmail(event) {
        this.setState({
            email: event.target.value
        })
    }
    handleChangeFirstname(event) {
        this.setState({
            firstname: event.target.value
        })
    }
    handleChangeLastname(event) {
        this.setState({
            lastname: event.target.value
        })
    }
    handleChangeSurname(event) {
        this.setState({
            surname: event.target.value
        })
    }
    handleChangeUserSex(event) {
        this.setState({
            userSex: event.target.value
        })
    }
    
    
    render(){
        let UserName = React.createRef();
        let Email = React.createRef();
        let Firstname = React.createRef();
        let Lastname = React.createRef();
        let Surname = React.createRef();
       let floor=React.createRef();

       if (localStorage.getItem('User') && this.state.check){
        setTimeout(()=>{
            const User = JSON.parse(localStorage.getItem('User'));
            this.setState({ username: User.username });
            this.setState({ email: User.email });
            this.setState({ firstname: User.firstname });
            this.setState({ lastname: User.lastname });
            this.setState({ surname: User.surname });
            this.setState({ userSex: User.userSex });
            this.setState({check: false});
        }, 300)} 

      return (
        <div className={this.props.active ? "modal_creating active_modal" : "modal_creating"} onClick={this.props.setActive}>
            <div className="modal_content modal_name" onClick={e =>e.stopPropagation()}>
                <h3>Изминение личных данных</h3>
                <input placeholder="Логин" value={this.state.username} onChange={this.handleChangeUsername} ref={UserName}></input>
                <input placeholder="Email" value={this.state.email} onChange={this.handleChangeEmail} ref={Email}></input>
                <input placeholder="Имя"   value={this.state.firstname} onChange={this.handleChangeFirstname} ref={Firstname}></input>
                <input placeholder="Фамилия"  value={this.state.lastname} onChange={this.handleChangeLastname} ref={Lastname}></input>
                <input placeholder="Отчество" value={this.state.surname} onChange={this.handleChangeSurname} ref={Surname}></input>
                <div className="blok">
                <p>Выберите пол:</p>
                    <div className="select-wraper">
                    
                    <label for="floor" ></label>
                    <select id="floor" ref={floor}>
                        <option>Мужской</option>
                        <option>Женский</option>
                        <option>НЕХ</option>
                    </select>
                    </div>
                </div>
                
                <button onClick={()=>{
                    console.log(floor.current.value)
                    putUser(UserName.current.value, Email.current.value, Firstname.current.value, Lastname.current.value, Surname.current.value, floor.current.value)
                    setTimeout(()=>{
                        getUser()
                    }, 300)
                    
                }}> Изменить</button>
            
            </div>

        </div>
      )
    }


}

//<button onClick={this.props.setActive}> Скрыть</button>

//let username=React.createRef();
//setTimeout(()=>{
//    putUser(username={});
//    this.props.setActive
//}, 300)

async function putUser(username, email, firstname, lastname, surname, userSex) {
    console.log(username);
    let JWT_a;
    let json = {
        "username": ""+username,
        "email": ""+email,
        "firstname": ""+firstname,
        "lastname": ""+lastname,
        "surname": ""+surname,
        "userSex": ""+userSex
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