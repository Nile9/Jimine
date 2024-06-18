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
import { BsFillReplyFill } from "react-icons/bs";
export default class History extends Component {
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
        
        

        if (localStorage.getItem('Histori') && this.state.check){
            gettingTasks()
            setTimeout(()=>{
                const newArray = JSON.parse(localStorage.getItem('Histori'));
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
                                    const newArray = JSON.parse(localStorage.getItem('Histori'));
                                    this.setState({ Tasks: newArray });
                                    this.setState({ check: true });
                                }, 300)
                            }}><AiOutlineUndo /> Update</button>
                            <babel className="searchByName">
                            <button title="Поиск задачи" className="cursorPointer" onClick={()=>{
                                filtering(this.state.filtrName);
                                this.setState({ check: false });
                                setTimeout(()=>{
                                    
                                    const newArray = JSON.parse(localStorage.getItem('Histori'));
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
                                        <p>Когда Удалили: {(new Date(el.deletedAt)).toLocaleString()}</p>
                                        </div>
                                    <div className="opportunities">
                                        <button title="востоновить задачу" className="cursorPointer" onClick={() => {
                                            UpdateTask(el.taskId) 
                                            }} ><BsFillReplyFill/> Recovery</button>
                                    </div>
                                    </div>
                                    <div className="FooterCard">
                                        <p>Описание:{el.description}</p>
                                    </div>
                                </div>))}
                            </div>
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
    const newArray = JSON.parse(localStorage.getItem('Histori'));
    for (const project of newArray){
        if (project.name.includes(""+name+"")){
            newlist.push(project)
        } 
        
    };
    //console.log(newlist)
    localStorage.setItem('Histori', JSON.stringify(newlist))
    
};


 

async function gettingTasks() { // получаем удалённые задачи
    let Tasks =[];

    
   
    let JWT_a;
    if (localStorage.getItem('JWT_authorization')) {
        JWT_a =localStorage.getItem('JWT_authorization')
    }
    
    
    axios.get('http://localhost:8081/users/me/tasks/hist',{
        headers: {
            'Authorization': 'Bearer ' + JWT_a
        }}
    ).then(response =>{
        
        for (let i = 0; i<response.data.length; i++){
            Tasks.push(response.data[i])
        }
        
        localStorage.setItem('Histori', JSON.stringify(Tasks))
        
    }).catch(error => {console.error(error);
        alert("Что-то пошло не так. Попробуйте перезагругить страницу!");
        
    });   
    
} 






async function UpdateTask(taskId) { 
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