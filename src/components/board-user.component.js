import React, { useEffect, useState } from "react"

import UserService from "../services/user.service"

const UserBoard = () => {

    useEffect( () => {
        UserService.getUserBoard()
            .then(
                response => {
                    setUserContent( response.data )
                },
                err => {
                    setUserContent( (err.response && err.response.data && err.response.data) || err.message || err.toString() )
                }
            )
    }, [] )

    const [ userContent, setUserContent ] = useState("")

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{userContent}</h3>
            </header>
        </div>
    )

}

export default UserBoard
