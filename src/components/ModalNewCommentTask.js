import React, { Component } from "react";
import Button from "./Button";
import axios from 'axios';


export default class ModalNewComment extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        description: ""

      }
      this.handleChangeName = this.handleChangeName.bind(this)
      this.handleChangeDescription = this.handleChangeDescription.bind(this)
    }
    handleChangeName(event) {
      this.setState({
        name: event.target.value
      })
    }
    handleChangeDescription(event) {
      this.setState({
        description: event.target.value
      })
    }
    
    render(){
      //let Name = React.createRef();
      //let Description = React.createRef();
      return (
        <div className={this.props.active ? "modal_creating active_modal" : "modal_creating"} onClick={this.props.setActive}>
            <div className="modal_content" onClick={e =>e.stopPropagation()}>
                <h3>Написать коментарий:</h3>
                <input placeholder="Тема" value={this.state.name} onChange={this.handleChangeName} ></input>
                <textarea placeholder="Содержание" value={this.state.description} onChange={this.handleChangeDescription} ></textarea>
                
                <Button function={()=>{
                    const idTask = JSON.parse(localStorage.getItem('TaskIDinComment'));
                  

                  setTimeout(()=>{
                    createComment(this.state.name, this.state.description, idTask);
                  }, 300);
                  setTimeout(()=>{
                    localStorage.setItem('UpdateComment', true);
                  }, 500)
                  
                  
                }} />
            </div>

        </div>
      )
    }


}


















async function createComment(name, content, taskId) { //создаём коментарий к задаче
    
    let JWT_a;
    if (localStorage.getItem('JWT_authorization')) {
        JWT_a =localStorage.getItem('JWT_authorization')
    }
    //console.log(JWT_a)
    
    
    axios({
        method: 'post',
        url: 'http://localhost:8081/tasks/'+taskId+'/comments',
        data: {
            "name": ""+name,
            "content": ""+content
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JWT_a
        }
    }).then(response =>{
        
    }).catch(error => {console.error(error);
        alert("Что-то пошло не так. Попробуйте перезагругить страницу!");
        
    });   
    //return()
}