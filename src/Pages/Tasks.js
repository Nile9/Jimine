import React, { Component } from "react";
import Header_p from "../components/header_p";
import Logo from "../img/Logo_1.png"
import Footer from "../components/footer";
import axios from 'axios';
import Button from "../components/Button";
import ModalNewTasks from "../components/ModalNewTasks";
import ModalUpdate from "../components/ModalUpdateMeTask";
import ModalNewComment from "../components/ModalNewCommentTask";
import ModalNewUserProject from "../components/ModalNewUserProject";
import ModalNewUserTask from "../components/ModalNewUserTask";
import { AiOutlinePlusCircle } from "react-icons/ai"; //плюс
import { IoCloseCircleSharp } from 'react-icons/io5' //удалить
import { AiFillMessage } from "react-icons/ai"; // коментарий
import { AiOutlineSolution } from "react-icons/ai"; // пользователя к проекту
import { AiOutlineUserAdd } from "react-icons/ai"; // пользователя к задаче
import { AiOutlineUndo } from "react-icons/ai"; // перезагрузка
import { AiTwotoneEdit } from "react-icons/ai"; // изминение данных
import { AiOutlineSearch } from "react-icons/ai"; //поиск
import { VscAdd } from "react-icons/vsc";// плюс

export default class ProjectInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            check: true,
            checkUser: true,
            nameProject: "",
            projectStatusName: "",
            descriptionProject: "",
            idProject: null,
            ProjectUser: "",
            modalActiveCreateTask: false,
            modalActiveUpdateTask: false,
            modalActiveNewCommentTask: false,
            modalActiveNewUserProject: false,
            modalActiveNewUserTask: false,
            Tasks: [],
            filtrName: "",
            TaskComent: [],
            NameTasksComment: "",
            idTask_NewUser: null
            
        };
        this.handleChangeFiltrName = this.handleChangeFiltrName.bind(this);
        this.handleChangecheckUser = this.handleChangecheckUser.bind(this);
    }
    handleChangeFiltrName(event) {
        this.setState({filtrName: event.target.value})
    }
    handleChangecheckUser(event) {
        this.setState({checkUser: !this.state.checkUser})
    }


    render() {
        if (JSON.parse(localStorage.getItem('UpdateComment'))){
            getComment(JSON.parse(localStorage.getItem('TaskIDinComment')));
            setTimeout(()=>{               
                const newArray = JSON.parse(localStorage.getItem('Comments'));
                
                this.setState({ TaskComent: newArray });
            }, 300)
            localStorage.setItem('UpdateComment', false);
        }
        if (localStorage.getItem('consideredProject')){
            
            setTimeout(()=>{
                const Project = JSON.parse(localStorage.getItem('consideredProject'));
                this.setState({ nameProject: Project.name });
                this.setState({ projectStatusName: Project.projectStatusName });
                this.setState({ descriptionProject: Project.description });
                this.setState({ idProject: Project.id });
            }, 300)
        }

        if (localStorage.getItem('MeTasks') && this.state.check){
            gettingTasks()
            setTimeout(()=>{
                const newArray = JSON.parse(localStorage.getItem('MeTasks'));
                this.setState({ Tasks: newArray });
                
            }, 300)

        }
        

        
//<button title="Изминить проект" className="cursorPointer"><AiTwotoneEdit title="Изменить проект" /> Editing</button>
        return( 
            <div>
                <div>
                <Header_p image={Logo} />
                </div> 
                <div className="contentTasc">
                    <div className="content-left">
                        
                        <div className="AdminWindow">
                            
                            <p>Работа над задачами:
                            
                            <button title="Обновить задачи" className="cursorPointer" onClick={() => {
                                gettingTasks();
                                setTimeout(()=>{
                                    const newArray = JSON.parse(localStorage.getItem('MeTasks'));
                                    this.setState({ Tasks: newArray });
                                    this.setState({ check: true });
                                }, 300)
                            }}><AiOutlineUndo /> Update</button>
                            <babel className="searchByName">
                            <button title="Поиск задачи" className="cursorPointer" onClick={()=>{
                                filtering(this.state.filtrName);
                                this.setState({ check: false });
                                setTimeout(()=>{
                                    
                                    const newArray = JSON.parse(localStorage.getItem('MeTasks'));
                                    this.setState({ Tasks: newArray });
                                    
                                }, 300)}} ><AiOutlineSearch/> Search</button>
                            <input className="inputHeal" value={this.state.filtrName} onChange={this.handleChangeFiltrName}></input>
                            </babel>
                            
                            
                            
                            </p>
                        </div>
                        <div className="TaskProject">
                            <div className="Tasks">
                                {this.state.Tasks.map((el)=>(<div className="TasksCard">
                                    <div className="HeadCard line" >
                                        <div className="specifications">
                                        <h3>{el.name}</h3>
                                        <p>Приоритет: {el.taskPriorityName}</p>
                                        <p>Статус: {el.taskStatusName}</p>
                                        <p>Тип: {el.taskTypeName}</p>
                                        <p>Отвечаюшие:</p> 
                                        {el.taskWorkers.map((user, i) => (
                                        <div key={i}>
              
                                        <p>{`Name: ${user.username}`+ ` Role: ${user.userTaskRoleName}`}</p>
                                        
                                        </div>
                                        ))}
                                        </div>
                                    <div className="opportunities">
                                        <button title="Изминить задачу" className="cursorPointer" onClick={() => {
                                            localStorage.setItem('UpdateTasks', JSON.stringify({
                                                "description": el.description,
                                                "name": el.name,
                                                "id": el.taskId
                                            }));
                                            localStorage.setItem('UpdateTasksUp', true);
                                            this.setState({modalActiveUpdateTask: (!this.state.modalActiveUpdateTask)});
                                
                                            }} ><AiTwotoneEdit/> Editing</button>
                                        <button title="Удалить задачу" className="cursorPointer" onClick={()=>{
                                            DeleteTask(el.taskId);
                                            gettingTasks();
                                            setTimeout(()=>{
                                                
                                                gettingTasks();
                                            }, 100)
                                            setTimeout(()=>{
                                                
                                                const newArray = JSON.parse(localStorage.getItem('MeTasks'));
                                                this.setState({ Tasks: newArray });
                                            }, 300)
                                            
                                            }}><IoCloseCircleSharp /> Delete</button>
                                        
                                        
                                        <button title="Посмотреть коментарии" className="cursorPointer" onClick={()=>{
                                            getComment(el.taskId);
                                            setTimeout(()=>{
                                                
                                                const newArray = JSON.parse(localStorage.getItem('Comments'));
                                                localStorage.setItem('TaskIDinComment', el.taskId);
                                                this.setState({NameTasksComment: el.name});
                                                this.setState({ TaskComent: newArray });

                                            }, 300)
                                            
                                            }}><AiFillMessage /> Сomments</button>
                                    </div>
                                    </div>
                                    <div className="FooterCard">
                                        <p>Описание:{el.description}</p>
                                    </div>
                                </div>))}
                            </div>
                        </div>

                    </div>
                    <div className="content-right">
                        <div className="TaskСomments">
                            <div className="CommentsHead">
                                <h3>{(this.state.NameTasksComment === "") ? "Коментарии: Выберите задачу" : "Коментарии к "+this.state.NameTasksComment+":"}</h3>
                                {(this.state.NameTasksComment === "") ? <p></p> : <VscAdd className="icon" title="Написать коментарий" onClick={()=>{
                                    this.setState({modalActiveNewCommentTask: (!this.state.modalActiveNewCommentTask)});
                                }}/>}
                                
                            </div>
                            
                            {this.state.TaskComent.map((eli)=>(
                            <div className="CommentCard"> 
                                <p>Тема: {eli.commentName}</p>
                                <p>Автор: {eli.username}</p>
                                <p className="line"></p>
                                <p>{eli.content}</p>
                                <sub>{(new Date(eli.createdAt)).toLocaleString()}</sub>
                            </div>))}
                            
                        </div>
                    </div>
                    
                </div>
                
                <ModalNewTasks active={this.state.modalActiveCreateTask} setActive={() => this.setState({modalActiveCreateTask: (!this.state.modalActiveCreateTask)})}/>
                <ModalUpdate active={this.state.modalActiveUpdateTask} setActive={() => this.setState({modalActiveUpdateTask: (!this.state.modalActiveUpdateTask)})}/>
                <ModalNewComment active={this.state.modalActiveNewCommentTask} setActive={() => this.setState({modalActiveNewCommentTask: (!this.state.modalActiveNewCommentTask)})}/>
                <ModalNewUserProject  active={this.state.modalActiveNewUserProject} setActive={() => this.setState({modalActiveNewUserProject: (!this.state.modalActiveNewUserProject)})} SetUser={()=>this.setState({checkUser: (!this.state.checkUser)})}/>
                <ModalNewUserTask active={this.state.modalActiveNewUserTask} setActive={() => this.setState({modalActiveNewUserTask: (!this.state.modalActiveNewUserTask)})} IdTask={this.state.idTask_NewUser}/>
                <Footer/>
            </div>
        )
    }
}



 


function filtering (name) {
    const newlist = [];
    const newArray = JSON.parse(localStorage.getItem('MeTasks'));
    for (const project of newArray){
        if (project.name.includes(""+name+"")){
            newlist.push(project)
        } 
        
    };
    //console.log(newlist)
    localStorage.setItem('MeTasks', JSON.stringify(newlist))
    
};


 

async function gettingTasks() { // получаем задачи
    let Tasks =[];

    
   
    let JWT_a;
    if (localStorage.getItem('JWT_authorization')) {
        JWT_a =localStorage.getItem('JWT_authorization')
    }
    
    
    axios.get('http://localhost:8081/users/me/tasks?withUsers',{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JWT_a
        }}
    ).then(response =>{
        
        for (let i = 0; i<response.data.length; i++){
            Tasks.push(response.data[i])
        }
        let newArr = [];
        let ids = {};

        Tasks.forEach(obj => {
            if (!ids[obj.taskId]) {
                ids[obj.taskId] = true;
                newArr.push(obj);
            }
        });// убираем повторы
        localStorage.setItem('MeTasks_Work', JSON.stringify(newArr.map(obj => obj.taskWorkers)))
        const Tasks_2 = newArr.map(obj => {
            const { taskWorkers, ...rest } = obj;
            return rest;
        });
        
        localStorage.setItem('MeTasks', JSON.stringify(newArr))
        
    }).catch(error => {console.error(error);
        alert("Что-то пошло не так. Попробуйте перезагругить страницу!");
        
    });   
    
} 


async function getUser() { //получаем юзера
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


async function DeleteTask(id) { //удаляем задачу
    let JWT_a;
    if (localStorage.getItem('JWT_authorization')) {
        JWT_a =localStorage.getItem('JWT_authorization')
    }
    
    axios.delete('http://localhost:8081/tasks/'+id,
        {
        headers: {
            'Authorization': 'Bearer '+JWT_a
        }}
        ).then(response =>{
        //console.log(response.data.length);
        //console.log(response.data[0]);
        
        

        
    }).catch(error => {console.error(error);
        alert("Что-то пошло не так. Попробуйте перезагругить страницу!");
        
    });   
    
}



async function UpdateTask(name, description, taskTypeId, taskStatusId,  taskPriorityId, taskId) { //обновляем задачу
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
            "taskPriorityId": Number(taskPriorityId)
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


async function getComment(taskId) { //получаем коментарии к задаче
    let JWT_a;
    if (localStorage.getItem('JWT_authorization')) {
        JWT_a =localStorage.getItem('JWT_authorization')
    }
    console.log(JWT_a)
    axios.get('http://localhost:8081/tasks/'+taskId+'/comments/page', {
        headers: {
            'Authorization': 'Bearer '+JWT_a
        }}
        ).then(response =>{
        
        localStorage.setItem('Comments', JSON.stringify(response.data))
        

        
    }).catch(error => {console.error(error);
        alert("Что-то пошло не так. Попробуйте перезагругить страницу!");
        
    });   
    //return()
}

