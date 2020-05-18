import React/* , { Component } */ from 'react'
import Logo from './components/Logo';
import Form from './components/Form';
import Extras from './components/Extras';



export default function Login () {
  /*   constructor(props){
        super(props);
        /* this.state = {
            message : ""
        } */
   // } */


    

    /* componentDidMount(){
        fetch("/api/").then((response)=>{
            response.json().then((jsonResponse)=>{
                this.setState({
                    message : jsonResponse.message
                })
            },(erro)=>{
                console.log("JSON ERROR");
            });
        },(err)=>{
            console.log("FETCH ERROR");
        });
    } */

    //render() {
        /* const {message} = this.state; */



        return (
            <body className="hold-transition login-page">            
                <div className="login-box">
                    {/* <h1>{JSON.stringify(isLogged)}</h1> */}
                {/* <p> Mensaje del server {message}</p> */}
                    <Logo>
                        
                    </Logo>
                    <Form>

                    </Form>
                    {/* <p>{isLogged}</p> */}
                    {/* <button  >ASYNC REDUX</button> */}
                    <Extras/>
                </div>
            </body>
        )
    //}
}
