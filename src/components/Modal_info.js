import React, { Component } from "react";
import Button from "./Button";


export default class Modal extends Component {
    constructor(props) {
      super(props);
      this.state = {

      }
    }
    
    render(){

      return (
        <div className={this.props.active ? "modal_creating active_modal" : "modal_creating"} onClick={this.props.setActive}>
            <div className="modal_content">
                <h3>Правила Валидации:</h3>
                <h4>Логин</h4>
                <p>Длина не должна быть меньше 4 символов. И не больше 15. А так же он должен быть уникален.</p>
                <h4>Пароль</h4>
                <p>Длина не должна быть меньше 4 символов. И не больше 15.</p>
                <h4>Email</h4>
                <p>Дожен быть введён Email.</p>
                
            </div>

        </div>
      )
    }


}