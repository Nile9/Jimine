import React, { Component } from "react";
import Button from "./Button";
import axios from 'axios';


export default class ModalUpdateProject extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        description: "",
        id: null,
        StatusId: null,
        check: true


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
      let StatusId = React.createRef();
      const chet = JSON.parse(localStorage.getItem('UpdateProjectUp'));

      if (localStorage.getItem('UpdeteProject')  && chet){
            
        setTimeout(()=>{
            const Project = JSON.parse(localStorage.getItem('UpdeteProject'));
            this.setState({ name: Project.name });
            this.setState({ description: Project.description });
            this.setState({ id: Project.id });
            this.setState({check: false});
            localStorage.setItem('UpdateProjectUp', false);
            
        }, 300)
    }

      return (
        <div className={this.props.active ? "modal_creating  active_modal" : "modal_creating"} onClick={this.props.setActive}>
            <div className="modal_content modal_proj" onClick={e =>e.stopPropagation()}>
                <h3>Изминение проекта</h3>
                <input placeholder="Название" value={this.state.name} onChange={this.handleChangeName} ></input>
                <textarea placeholder="Описание" value={this.state.description} onChange={this.handleChangeDescription} ></textarea>
                <div className="blok">
                    <p>Выберите статус проекта:</p>
                    <div className="select-wraper">
                    <label for="Status" ></label>
                    <select id="Status" ref={StatusId}>
                        <option>Новый</option>
                        <option>В разработке</option>
                        <option>Закончен</option>
                        <option>Закрыт</option>
                    </select>
                    </div>
                </div>
                <Button text={"Изменить"} function={()=>{

                    switch (StatusId.current.value) {
                        case "Новый":
                          
                          this.setState({ StatusId: 0 });
                          break;
                        case "В разработке":
                          
                          this.setState({ StatusId: 1 });
                          break;
                        case "Закончен":
                          
                          this.setState({ StatusId: 2 });
                          break;
                        case "Закрыт":
                          
                          this.setState({ StatusId: 3 });
                          break;
                      };
                      setTimeout(()=>{
                        
                        UpdateProject(this.state.name, this.state.description, this.state.StatusId, this.state.id);
                    }, 450)
                    
                  
                      
                      
                }} />
            </div>

        </div>
      )
    }


}

async function UpdateProject(name, description, projectStatusId, id) { //обновляем проект
    
    let JWT_a;
    if (localStorage.getItem('JWT_authorization')) {
        JWT_a =localStorage.getItem('JWT_authorization')
    }
   
    
    axios({
        method: 'put',
        url: 'http://localhost:8081/projects/'+id,
        data: {
            "name": ""+name,
            "description": ""+description,
            "projectStatusId": Number(projectStatusId)
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

