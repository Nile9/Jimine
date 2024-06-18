import React, { Component } from "react";
import Button from "./Button";
import axios from 'axios';


export default class Modal extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        description: "",
        projectId: null,
        TaskTypeId: null,
        TaskPriorityId: null
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
        let Name = React.createRef();
        let Description = React.createRef();
        let taskTypeId = React.createRef();
        let taskPriorityId = React.createRef();
        
        if (localStorage.getItem('consideredProject')){
            
            setTimeout(()=>{
                const Project = JSON.parse(localStorage.getItem('consideredProject'));
                
                this.setState({ projectId: Project.id });
            }, 300)

        }
       

      return (
        <div className={this.props.active ? "modal_creating active_modal" : "modal_creating"} onClick={this.props.setActive}>
            <div className="modal_content modal_name" onClick={e =>e.stopPropagation()}>
                <h3>Создание задачи</h3>
                <input placeholder="Название" value={this.state.name} onChange={this.handleChangeName} ref={Name}></input>
                <textarea placeholder="Описание" value={this.state.description} onChange={this.handleChangeDescription} ref={Description}></textarea>

                <div className="blok">
                    <p>Выберите тип задачи:</p>
                    <div className="select-wraper">
                    <label for="type" ></label>
                    <select id="type" ref={taskTypeId}>
                        <option>Бекенд</option>
                        <option>Аналитическая</option>
                        <option>Фронтенд</option>
                        <option>Архитекнирная</option>
                    </select>
                    </div>
                </div>

                <div className="blok">
                    <p>Выберите приоритет задачи:</p>
                    <div className="select-wraper">
                    <label for="floor" ></label>
                    <select id="floor" ref={taskPriorityId}>
                        <option>Высокий</option>
                        <option>Средний</option>
                        <option>Низкий</option>
                    </select>
                    </div>
                </div>
                
                <button onClick={()=>{
                    

                    switch (taskTypeId.current.value) {
                        case "Бекенд":
                          ;
                          this.setState({ TaskTypeId: 0 });
                          break;
                        case "Аналитическая":
                          
                          this.setState({ TaskTypeId: 1 });
                          break;
                        case "Фронтенд":
                          
                          this.setState({ TaskTypeId: 2 });
                          break;
                        case "Архитекнирная":
                            
                            this.setState({ TaskTypeId: 3 });
                            break;
                      }
                      switch (taskPriorityId.current.value) {
                        case "Высокий":
                          
                          this.setState({ TaskPriorityId: 0 });
                          break;
                        case "Средний":
                          
                          this.setState({ TaskPriorityId: 2 });
                          break;
                        case "Низкий":
                          
                          this.setState({ TaskPriorityId: 1 });
                          break;
                      }
                        
                    setTimeout(()=>{
                        console.log(this.state.name);
                        console.log(this.state.description);
                        console.log(this.state.TaskTypeId);
                        console.log(this.state.TaskPriorityId);
                        console.log(this.state.projectId);
                        CreateTask(this.state.name, this.state.description, this.state.TaskTypeId, this.state.TaskPriorityId, this.state.projectId);
                        
                    }, 300)
                    setTimeout(()=>{
                        gettingTasks();
                    }, 400)
                    
                    
                }}>Создать</button>
                
            </div>

        </div>
      )
    }


}

async function CreateTask(name, description, taskTypeId,  taskPriorityId, projectId) { //создаём задачу
    let project;
    let JWT_a;
    if (localStorage.getItem('JWT_authorization')) {
        JWT_a =localStorage.getItem('JWT_authorization')
    }
    //console.log(JWT_a)
    if (localStorage.getItem('consideredProject')) {
        project =localStorage.getItem('consideredProject')
    }
    
    axios({
        method: 'post',
        url: 'http://localhost:8081/tasks',
        data: {
            "name": ""+name,
            "description": ""+description,
            "taskStatusId": 0,
            "taskTypeId": Number(taskTypeId),
            "taskPriorityId": Number(taskPriorityId),
            "projectId": Number(projectId)
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

async function gettingTasks() { // получаем задачи
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
    
    axios.get('http://localhost:8081/projects/'+symbolsAfterProjects+'/tasks?withUsers', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JWT_a
        }}
    ).then(response =>{
        
        for (let i = 0; i<response.data.length; i++){
            Tasks.push(response.data[i])
        }
        const Tasks_2 = Tasks.map(obj => {
            const { taskWorkers, ...rest } = obj;
            return rest;
          });
        //console.log(Tasks);
        localStorage.setItem('ProjectTasks', JSON.stringify(Tasks_2))
        
    }).catch(error => {console.error(error);
        alert("Что-то пошло не так. Попробуйте перезагругить страницу!");
        
    });   
    
}
