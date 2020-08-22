import React/* , { Component } */ from 'react'
import {useDispatch} from 'react-redux';

import {singIn} from '../actions/singInAction'

export default function  Form (){
    
    /* const [submitted, setSubmitted] = useState(false);
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    }); */

    /* const { username, password } = inputs; */

    //const isLogged = useSelector(state => state.isLogged);
    

   /*  function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    } */

    function handleSubmit(e) {
        e.preventDefault();

        let userParam =  document.getElementById('input-user').value;
        let pwdParam = document.getElementById('input-password').value;
        // setSubmitted(true);
        /* console.log(userParam);
        console.log(pwdParam); */
        if(userParam && pwdParam) {
            dispatch(singIn(userParam, pwdParam));
        }
    }

    const dispatch = useDispatch();

        return (
            <div className="card">
                <div className="card-body login-card-body">

                <p className="login-box-msg">Inicar Sesión</p>

                <form onSubmit={handleSubmit} method="post">

                    <div className="input-group mb-3">
                        <input id="input-user" type="text"    className="form-control" required="true" placeholder="Correo" />
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fas fa-envelope" />
                            </div>
                        </div>
                    </div>

                    <div className="input-group mb-3">
                        <input id="input-password" type="password"   className="form-control" required="true" placeholder="Contraseña" />
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fas fa-lock" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                         <div className="col-7">
                             {/*
                            <div className="icheck-primary">
                                <input type="checkbox" id="remember" />
                                <label htmlFor="remember">
                                    Recuerdame
                                </label>
                            </div>
                            */}
                        </div> 
                        {/* /.col */}
                        <div className="col-5">
                            <button type="submit" /* onClick={handleChange} */ className="btn btn-primary btn-block">Iniciar sesión</button>
                        </div>
                        {/* /.col */}

                       
                    </div>
                    
                </form>


                </div>
            </div>
            

        )
    
}
