import React, { Component } from "react";
import Button from "./Button";
import axios from 'axios';


export default class ModalNewUserTask extends Component {
    constructor(props) {
      super(props);
      this.state = {
        users: [],
        user_id: null,
        role: null,
        checkUser: true


      }
      
    }
    
    
    
    render(){
      let idUser = React.createRef();
      let idRoleUser = React.createRef();
      if (localStorage.getItem('ProjectUser') && this.state.checkUser ){
         
        
        setTimeout(()=>{
            const newlist = [];
            const Array = JSON.parse(localStorage.getItem('ProjectUser'));
            for (const User of Array){
                newlist.push({
                    username: User.username,
                    userId: User.userId
                })
                
            };
            

            this.setState({ users: newlist});
            console.log(this.state.users)
            this.setState({checkUser: false});
        }, 200) 
        } 

      return (
        <div className={this.props.active ? "modal_creating  active_modal" : "modal_creating"} onClick={this.props.setActive}>
            <div className="modal_content modal_new_user_task" onClick={e =>e.stopPropagation()}>
                <h3>Добовление пользователя к задаче</h3>
                
                <div className="blok">
                    <p>Выберите пользователя:</p>
                    <div className="select-wraper">
                    <label for="Users" ></label>
                    <select id="Users" ref={idUser}>
                    {this.state.users.map(option => (
                        <option  key={option.userId} value={option.userId}>{option.username} </option>
                        ))}
                    </select>
                    </div>
                </div>
                <div className="blok">
                    <p>Выберите роль пользователя:</p>
                    <div className="select-wraper">
                    <label for="Role" ></label>
                    <select id="Role" ref={idRoleUser} >
                        <option value="0" >Администратор</option>
                        <option value="1">Проверяюший</option>
                        <option value="2">Отвественый</option>
                    </select>
                    </div>
                </div>
                <Button text={"Назначить"} function={()=>{
                    console.log(idUser.current.value);
                    console.log(idRoleUser.current.value);
                    console.log(this.props.IdTask);
                    this.setState({user_id: Number(idUser.current.value)});
                    this.setState({role: Number(idRoleUser.current.value)});
                    
                    setTimeout(()=>{
                        addPersonTask(this.state.user_id, this.state.role, this.props.IdTask)
                        
                    }, 350);
                    
                  
                      
                      
                }} />
            </div>

        </div>
      )
    }


}


async function addPersonTask(workerId, userTaskRoleId, taskId) { // добовляем пользователя к задаче
    let Tasks =[];

    

    let JWT_a;
    if (localStorage.getItem('JWT_authorization')) {
        JWT_a =localStorage.getItem('JWT_authorization')
        
    }
    //console.log(JWT_a)
    
    axios({
      method: 'post',
      url: "http://localhost:8081/tasks/"+taskId+"/users",
      data: {
        "workerRequestList" : [ {
          "workerId" : Number(workerId),
          "userTaskRoleId" : Number(userTaskRoleId)
        } ]
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JWT_a
      }
  }).then(response =>{
        
        // 
        
    }).catch(error => {console.error(error);
        alert("Что-то пошло не так. Попробуйте перезагругить страницу!");
        
    });   
    
}




