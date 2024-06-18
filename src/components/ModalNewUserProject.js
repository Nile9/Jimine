import React, { Component } from "react";
import Button from "./Button";
import axios from 'axios';


export default class ModalNewUserProject extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",

      }
      this.handleChangeName = this.handleChangeName.bind(this)
    }
    handleChangeName(event) {
      this.setState({
        name: event.target.value
      })
    }
   
    
    render(){
      //let Name = React.createRef();
      //let Description = React.createRef();
      return (
        <div className={this.props.active ? "modal_creating active_modal" : "modal_creating"} onClick={this.props.setActive}>
            <div className="modal_content modal_new_user_project" onClick={e =>e.stopPropagation()}>
                <h3>Добовление пользователя к проекту</h3>
                <input placeholder="Id Пользователя" value={this.state.name} onChange={this.handleChangeName} ></input>
                
                <Button text={"Добавить"} function={()=>{
                  addPersonProject(this.state.name);
                  setTimeout(this.props.SetUser, 300);
                  
                 }} />
            </div>

        </div>
      )
    }


}





async function addPersonProject(idPerson) { // добовляем пользователя к проекту
    let Tasks =[];

    var currentUrl = window.location.href;
    const startIndex = currentUrl.indexOf("Projects/:") + "Projects/:".length;
    const symbolsAfterProjects = currentUrl.substring(startIndex);
    //console.log(symbolsAfterProjects);
    //получаем id проекта из адресной строки

    let JWT_a;
    if (localStorage.getItem('JWT_authorization')) {
        JWT_a =localStorage.getItem('JWT_authorization')
        
    }
    //console.log(JWT_a)
    
    axios({
      method: 'post',
      url: 'http://localhost:8081/projects/'+ symbolsAfterProjects +'/add-user/1/'+ idPerson,
      data: {
          
      },
      headers: {
          'Authorization': 'Bearer ' + JWT_a
      }
  }).then(response =>{
        
        // 
        
    }).catch(error => {console.error(error);
        alert("Что-то пошло не так. Попробуйте перезагругить страницу!");
        
    });   
    
}