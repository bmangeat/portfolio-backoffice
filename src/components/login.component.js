import React, { useState } from "react";
import { useForm } from 'react-hook-form'

import { useHistory } from "react-router-dom";

// Import services
import AuthService from "../services/auth.service";

const Login = () => {
    const history = useHistory();
    const { register, handleSubmit, errors } = useForm()

    const [ username, setUsername ] = useState( '' )
    const [ password, setPassword ] = useState( '' )
    const [ loginMessage, setLoginMessage ] = useState( '' )
    const [ loading, setLoading ] = useState( false )

    const onLogin = () => {
        setLoading( true )

        AuthService.login( username, password )
            .then(
                () => {
                    history.push( '/profile' )
                    window.location.reload()
                },
                ( err ) => {
                    setLoading( false )
                    setLoginMessage(
                        (err.response &&
                            err.response.data &&
                            err.response.data.message) ||
                        err.message ||
                        err.toString()
                    )
                }
            )
    }


    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />
                <form onSubmit={handleSubmit( onLogin )}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={username}
                            onChange={( event ) => setUsername( event.target.value )}
                            ref={register( { required: true } )}
                        />

                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={( event ) => setPassword( event.target.value )}
                            ref={register( { required: true } )}
                        />
                    </div>
                    <div className="form-group">
                        <button
                            type='submit'
                            className="btn btn-primary btn-block"
                            disabled={loading}
                        >
                            {loading && (
                                <span className="spinner-border spinner-border-sm"/>
                            )}
                            <span>Login</span>
                        </button>
                    </div>
                    {loginMessage && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {loginMessage}
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Login
