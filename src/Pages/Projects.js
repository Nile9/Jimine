import React, { Component } from "react";
import Header_p from "../components/header_p";
import Logo from "../img/Logo_1.png"
import axios from 'axios';
import "../css/main.css"
import { IoCloseCircleSharp } from 'react-icons/io5'
import { AiFillTool } from "react-icons/ai";
import { VscAdd } from "react-icons/vsc";
import { BsArrowCounterclockwise } from "react-icons/bs";
import Modal_creating from "../components/Modal_creating"
import Footer from "../components/footer";
import Button from "../components/Button";
import { AiOutlineSearch } from "react-icons/ai"; //поиск
import { AiTwotoneEdit } from "react-icons/ai"; // изминение данных
import ModalUpdateProject from "../components/ModalUpdateProject";
//window.addEventListener('load', function() {});
import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink
} from "react-router-dom";

export default class Projects extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalActive: false,
            projects_1: [],
            filtrName: "",
            modalActiveP: false,
            chek: true
        };
        this.handleChangeFiltrName = this.handleChangeFiltrName.bind(this)
    }
    handleChangeFiltrName(event) {
        this.setState({filtrName: event.target.value})
    }
    
    
    render() {



        if (localStorage.getItem('myArray') && this.state.chek){
            //getDataA();
            setTimeout(()=>{
                getDataA();
                const newArray = JSON.parse(localStorage.getItem('myArray'));
                this.setState({ projects_1: newArray });
            }, 500)
        }
            
            return(
                <div>
                    <div>
                    <Header_p image={Logo} />
                    </div>
                    <div>
                    
                    </div>
                    <div className="projects"> 
                    {this.state.projects_1.map((el)=>(<div className="project_card">
                        <div className="head_card">
                            <h3> {el.name} </h3><h4>{el.projectStatusName} </h4>
                            <div className="config">
                            <AiTwotoneEdit title="Изменить проект" onClick={() => {
                                localStorage.setItem('UpdeteProject', JSON.stringify({
                                    "description": el.description,
                                    "name": el.name,
                                    "id": el.id
                                }));
                                localStorage.setItem('UpdateProjectUp', true);
                                setTimeout(()=>{
                                    this.setState({modalActiveP: (!this.state.modalActiveP)});
                                }, 400)
                                
                            }} className="icon"/>
                            <NavLink to={'/Projects/:'+el.id+""} activeClassName="active" >
                            <AiFillTool className="configuring"  title="Настроить" onClick={()=>{
                                localStorage.setItem('consideredProject', JSON.stringify(el))
                            }}/>
                            </NavLink>
                            <IoCloseCircleSharp className="removal" title="Удалить проект" onClick={()=>{
                                DeleteProject(el.id);
                                
                                setTimeout(()=>{
                                    getDataA();
                                    const newArray = JSON.parse(localStorage.getItem('myArray'));
                                    this.setState({ projects_1: newArray });
                                }, 300)}}/>
                            </div>
                            
                        </div>
                        <p> {el.description} </p>
                    </div>))}
                    </div>
    
                    <div className="floating_block">
                    <p>Административное окно</p>
                    <hr/>
                    <VscAdd className="creature_card" onClick={() => this.setState({modalActive: (!this.state.modalActive)})} title="Создать новый  проект"/>
                    <BsArrowCounterclockwise className="update_card" title="Обновить проекты" onClick={() => {
                        getDataA();
                        setTimeout(()=>{
                            this.setState({ chek: true});
                            const newArray = JSON.parse(localStorage.getItem('myArray'));
                            this.setState({ projects_1: newArray });
                        }, 300)}} />
                    <hr/>
                    <p>Поиск по названию:</p>
                    <input value={this.state.filtrName} onChange={this.handleChangeFiltrName}></input>
                    <Button function={()=>{
                       this.setState({chek:false});
                        setTimeout(()=>{
                            filtering(this.state.filtrName);
                            const newArray = JSON.parse(localStorage.getItem('myArray'));
                            this.setState({ projects_1: newArray });
                        }, 300);
                        

                        
                    }} text={"Поиск"}/>
                    </div>
                    <script>
                    </script>
                    <ModalUpdateProject active={this.state.modalActiveP} setActive={() => this.setState({modalActiveP: (!this.state.modalActiveP)})}/>
                    <Modal_creating active={this.state.modalActive} setActive={() => this.setState({modalActive: (!this.state.modalActive)})}/>
                    <Footer/>
                </div>
            )
        
       
        
    }
    
}


function filtering (name) {
    const newlist = [];
    const newArray = JSON.parse(localStorage.getItem('myArray'));
    for (const project of newArray){
        if (project.name.includes(""+name+"")){
            newlist.push(project)
        } 
        
    };
    console.log(newlist)
    localStorage.setItem('myArray', JSON.stringify(newlist))
    
};

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
async function getDataB(Name, Description) {
    let JWT_a;
    let myArray =[];
    if (localStorage.getItem('JWT_authorization')) {
        JWT_a =localStorage.getItem('JWT_authorization')
    }
    console.log(JWT_a)
    axios.get('http://localhost:8081/project',
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

async function DeleteProject(id) {
    let JWT_a;
    if (localStorage.getItem('JWT_authorization')) {
        JWT_a =localStorage.getItem('JWT_authorization')
    }
    
    axios.delete('http://localhost:8081/projects/'+id,
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