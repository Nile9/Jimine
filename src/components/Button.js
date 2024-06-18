import React from "react";

const Button = (props) => {
    return(
        <button  onClick={props.function}>{props.text}</button>
    )
}

Button.defaultProps ={
    text: "Отправить"
}

export default Button