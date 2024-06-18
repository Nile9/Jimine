import React, { Component } from 'react';
import { AiFillInfoCircle } from "react-icons/ai";
import Modal_info from './Modal_info';
  class Authorization extends Component {
    constructor(props) {
      super(props);
      this.state = {
        modalActive: false
      }
    }
    //const [login, handlerCh] = useState("");
    //const [password, handlerCha] = useState("");

    render(){
      return (

        <div className="Form_authorization">
          <AiFillInfoCircle  className='iconInfo' onClick={() => this.setState({modalActive: (!this.state.modalActive)})} />
        <h2 className='form_title'>Авторизация</h2> 
        <div className='form_field'>
          {this.props.nameDirty ? <div >{this.props.nameError}</div> : ""}
          <input value={this.props.usernameOrEmail} className='id' onChange={this.props.handleChangeUser} placeholder="Логин"/> 
        </div>
        <div className='form_field'>
          {this.props.passwordDirty ? <div>{this.props.passwordError}</div> : ""}
          <input value={this.props.password} name='password' onChange={this.props.handleChangePassword} placeholder="Пароль" type="password"/> 
        </div>
        <Modal_info active={this.state.modalActive} setActive={() => this.setState({modalActive: (!this.state.modalActive)})}/>
      </div>
 
      
    )
    }

    
  }

//<input value={login} className='id' onChange={(e) => handlerCh(e.target.login) } placeholder="Логин"/> 
//<input value={password} name='password' onChange={(e) => handlerCha(e.target.password) } placeholder="Пароль" type="password"/> 
  export default Authorization