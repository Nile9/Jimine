import React, { Component } from "react";
import Button from "./Button";
import axios from 'axios';


export default class Modal extends Component {
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
                <h3>Создание нового проекта</h3>
                <input placeholder="Название" value={this.state.name} onChange={this.handleChangeName} ></input>
                <textarea placeholder="Описание" value={this.state.description} onChange={this.handleChangeDescription} ></textarea>
                
                <Button function={()=>{
                  getDataB(this.state.name, this.state.description)
                  setTimeout(()=>{
                    
                    getDataA()
                  }, 300)
                  
                  
                }} />
            </div>

        </div>
      )
    }


}

async function getDataB(Name, Description) {
  let JWT_a;
  if (localStorage.getItem('JWT_authorization')) {
      JWT_a =localStorage.getItem('JWT_authorization')
  }
  console.log(JWT_a)
  axios.post('http://localhost:8081/projects',
      {
          "projectName": ""+Name,
          "projectDescription": ""+Description
      }, 
      {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+JWT_a
      }}
      ).then(response =>{
      //console.log(response.data.length);
      //console.log(response.data[0]);
      
      

      
  }).catch(error => {console.error(error);
      alert("Что-то пошло не так. Попробуйте перезагругить страницу!");
      
  });   

}

async function getDataA() {
  let JWT_a;
  let myArray =[];
  if (localStorage.getItem('JWT_authorization')) {
      JWT_a =localStorage.getItem('JWT_authorization')
  }
  console.log(JWT_a)
  axios.get('http://localhost:8081/users/me/projects?withUsers', {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+JWT_a
      }}
      ).then(response =>{
      //console.log(response.data.length);
      //console.log(response.data[0]);
      for (let i = 0; i<response.data.length; i++){
          myArray.push(response.data[i])
      }
      console.log(myArray);
      localStorage.setItem('myArray', JSON.stringify(myArray))
      

      
  }).catch(error => {console.error(error);
      alert("Что-то пошло не так. Попробуйте перезагругить страницу!");
      
  });   
  return(
      myArray
  )
}