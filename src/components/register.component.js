import React, { useState } from "react"
import { useForm } from 'react-hook-form'
import { isEmail } from "validator"

// Import services
import AuthService from "../services/auth.service"

const Register = () => {
    const [ username, setUsername ] = useState( '' )
    const [ email, setEmail ] = useState( '' )
    const [ password, setPassword ] = useState( '' )
    const [ registerMessage, setRegisterMessage ] = useState( '' )
    const [ successful, setSuccessful ] = useState( false )

    const { register, handleSubmit, errors } = useForm()

    const onRegister = () => {
        AuthService.register( username, email, password )
            .then(
                ( response ) => {
                    setSuccessful( true )
                    setRegisterMessage( response.data.message )

                },
                ( err ) => {
                    setSuccessful( false )
                    setRegisterMessage(
                        (err.response && err.response.data && err.response.data.message) ||
                        err.message ||
                        err.toString() )
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
                <form onSubmit={handleSubmit( onRegister )}>
                    {!successful && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={username}
                                    onChange={( event ) => {
                                        setUsername( event.target.value )
                                    }}
                                    ref={register( { required: true, maxLength: 20, minLength: 3 } )}
                                />
                                {
                                    errors.username &&
                                    <div className="alert alert-danger" role="alert">
                                        The username must be between 3 and 20 characters.
                                    </div>
                                }
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={( event ) => {
                                        setEmail( event.target.value )
                                    }}
                                    ref={register( { required: true, validate: isEmail } )}
                                />
                                {
                                    errors.email &&
                                    <div className="alert alert-danger" role="alert">
                                        This is not a valid email.
                                    </div>
                                }
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={( event ) => {
                                        setPassword( event.target.value )
                                    }}
                                    ref={register( { required: true, maxLength: 40, minLength: 6 } )}
                                />
                                {
                                    errors.password &&
                                    <div className="alert alert-danger" role="alert">
                                        The password must be between 6 and 40 characters.
                                    </div>
                                }
                            </div>
                            <div className="form-group">
                                <input className="btn btn-primary btn-block" type="submit" value="Sign up"/>
                            </div>
                        </div>
                    )}
                    {registerMessage && (
                        <div className="form-group">
                            <div
                                className={
                                    successful
                                        ? "alert alert-success"
                                        : "alert alert-danger"
                                }
                                role="alert"
                            >
                                {registerMessage}
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Register

