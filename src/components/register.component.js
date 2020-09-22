import React, { useState } from "react"
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"
import { isEmail } from "validator"

import AuthService from "../services/auth.service"

const required = value => {
    if ( !value ) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required
            </div>
        )
    }
}

const vemail = value => {
    if ( !isEmail( value ) ) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        )
    }
}

const vusername = value => {
    if ( value.lenght < 3 || value.lenght > 20 ) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        )
    }
}

const vpassword = value => {
    if ( value.lenght < 6 || value.lenght > 40 ) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        )
    }
}

const Register = () => {
    const [ username, setUsername ] = useState( '' )
    const [ email, setEmail ] = useState( '' )
    const [ password, setPassword ] = useState( '' )
    const [ registerMessage, setRegisterMessage ] = useState( '' )
    const [ successful, setSuccessful ] = useState( false )

    let registerForm = React.createRef()
    let checkBtn = React.createRef()

    const handleRegister = ( event ) => {
        event.preventDefault()
        registerForm.validateAll()

        if ( checkBtn.context._errors.length === 0 ) {
            AuthService.register( username, email, password )
                .then(
                    ( response ) => {
                        setRegisterMessage( response.data.message )
                        setSuccessful( true )

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
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form
                    onSubmit={handleRegister}
                    ref={c => {
                        registerForm = c;
                    }}>

                    {!successful && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={username}
                                    onChange={( event ) => {
                                        setUsername( event.target.value )
                                    }}
                                    validations={[ required, vusername ]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={(event) => {setEmail(event.target.value)}}
                                    validations={[ required, vemail ]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={(event) => {setPassword(event.target.value)}}
                                    validations={[ required, vpassword ]}
                                />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Sign Up</button>
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
                    <CheckButton
                        style={{ display: "none" }}
                        ref={c => {
                            checkBtn = c;
                        }}
                    />
                </Form>

            </div>
        </div>
    )
}

export default Register

