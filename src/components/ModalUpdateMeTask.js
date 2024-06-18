import React, { Component } from "react";
import Button from "./Button";
import axios from 'axios';


export default class ModalUpdate extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        description: "",
        TaskTypeId: null,
        TaskPriorityId: null,
        taskStatusId: null,
        taskId: null,
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
        let Name = React.createRef();
        let Description = React.createRef();
        let taskTypeId = React.createRef();
        let taskPriorityId = React.createRef();
        let taskStatusId =React.createRef();
        const chet = JSON.parse(localStorage.getItem('UpdateTasksUp'));
        
        if (localStorage.getItem('UpdateTasks') && chet){
            setTimeout(()=>{
                const Tasks = JSON.parse(localStorage.getItem('UpdateTasks'));
                
                this.setState({ name: Tasks.name });
                this.setState({ description: Tasks.description });
                this.setState({ taskId: Tasks.id });
                localStorage.setItem('UpdateTasksUp', false);
                
                
            }, 300)} 
       

      return (
        <div className={this.props.active ? "modal_creating active_modal" : "modal_creating"} onClick={this.props.setActive}>
            <div className="modal_content modal_namer" onClick={e =>e.stopPropagation()}>
                <h3>Изминение задачи</h3>
                <input placeholder="Название" value={this.state.name} onChange={this.handleChangeName} //ref={Name}
                ></input>
                <textarea placeholder="Описание" value={this.state.description} onChange={this.handleChangeDescription} //ref={Description}
                ></textarea>

                <div className="blok">
                    <p>Выберите статус задачи:</p>
                    <div className="select-wraper">
                    <label for="Status" ></label>
                    <select id="Status" ref={taskStatusId}>
                        <option>Новая</option>
                        <option>В разработке</option>
                        <option>Закрыта</option>
                    </select>
                    </div>
                </div>

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
                      };
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
                      };
                      switch (taskStatusId.current.value) {
                        case "Новая":
                          
                          this.setState({ taskStatusId: 0 });
                          break;
                        case "В разработке":
                          
                          this.setState({ taskStatusId: 1 });
                          break;
                        case "Закрыта":
                          
                          this.setState({ taskStatusId: 2 });
                          break;
                      };
                        
                    setTimeout(()=>{
                        
                        UpdateTask(this.state.name, this.state.description, this.state.TaskTypeId, this.state.TaskPriorityId, this.state.taskStatusId, this.state.taskId)
                    }, 450)
                    setTimeout(()=>{
                        gettingTasks();
                    }, 800)
                    
                    
                }}>Изменить</button>
                
            </div>

        </div>
      )
    }


}

async function UpdateTask(name, description, taskTypeId,  taskPriorityId, taskStatusId, taskId) { 
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
        url: 'http://localhost:8081/tasks/'+taskId,
        data: {
            "name": ""+name,
            "description": ""+description,
            "taskStatusId": Number(taskStatusId),
            "taskTypeId": Number(taskTypeId),
            "taskPriorityId": Number(taskPriorityId),
            "restore": "true"
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

    
    //console.log(symbolsAfterProjects);
    //получаем id проекта из адресной строки
    let JWT_a;
    if (localStorage.getItem('JWT_authorization')) {
        JWT_a =localStorage.getItem('JWT_authorization')
    }
    //console.log(JWT_a)
    
    axios.get('http://localhost:8081/users/me/tasks?withUsers',{
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
