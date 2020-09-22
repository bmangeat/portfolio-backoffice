import React, { useEffect, useState } from "react"

import UserService from "../services/user.service"

const ModBoard = () => {

    useEffect(() => {
        UserService.getModBoard()
            .then(
                response => {
                    setModContent( response.data )
                },
                err => {
                    setModContent( (err.response && err.response.data && err.response.data) || err.message || err.toString() )
                }
            )
    }, [])
    const [modContent, setModContent] = useState("")

    return(
        <div className="container">
            <header className="jumbotron">
                <h3>{modContent}</h3>
            </header>
        </div>
    )

}

export default ModBoard
