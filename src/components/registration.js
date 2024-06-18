import React, { Component } from 'react';
import { AiFillInfoCircle } from "react-icons/ai";
import Modal_info from './Modal_info';


  class Registration extends Component {
    constructor(props) {
      super(props);
      this.state = {
        modalActive: false

      }
    }
    
        
    render(){

      return (
        <div className="Form_registration">
          <AiFillInfoCircle  className='iconInfo' onClick={() => this.setState({modalActive: (!this.state.modalActive)})}/>
          <h2 className='form_title'>Регистрация</h2> 
  
          <div className='form_field'>
            {this.props.nameDirty ? <div>{this.props.nameError}</div> : ""}
            <input value={this.props.usernameOrEmail} onChange={this.props.handleChangeUser}  placeholder="Логин"/>
          </div>
  
          <div className='form_field'>
            {this.props.passwordDirty ? <div >{this.props.passwordError}</div> : ""}
            <input value={this.props.password} onChange={this.props.handleChangePassword} placeholder="Пароль" type="password"/> 
          </div>
  
          <div className='form_field'>
            {this.props.passwordDirty ? <div>{this.props.passwordError}</div> : ""}
            <input value={this.props.password_2} onChange={this.props.handleChangePassword_2} placeholder="Заново пароль" type="password"/> 
          </div>
  
          <div className='form_field'>
            {this.props.emailDirty ? <div >{this.props.emailError}</div> : ""}
            <input value={this.props.Email} onChange={this.props.handleChangeEmail} placeholder="Email"/> 
          </div>
          
          <Modal_info active={this.state.modalActive} setActive={() => this.setState({modalActive: (!this.state.modalActive)})}/>
        </div>
      )
    }

    
  }


  export default Registration