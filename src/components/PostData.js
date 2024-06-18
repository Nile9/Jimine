import axios from 'axios';
//import React from 'react';
export default async function postData(props) {
    

    axios.post('http://localhost:8081/auth/sign-in', {
        "usernameOrEmail": "user1",
        // "email": "user1@gmail.com",
        "password": "user1"
    }, {
        headers: {
            'Content-Type': 'application/json'
        }}
        ).then(response =>{
        console.log(response.data.token)
    }).catch(error => {console.error(error);
    });
    
    
}
