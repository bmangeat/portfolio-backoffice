import React, { useEffect, useState } from "react"

import UserService from "../services/user.service"

const AdminBoard = () => {

    useEffect( () => {
        UserService.getAdminBoard()
            .then(
                response => {
                    setAdminContent( response.data )
                },
                err => {
                    setAdminContent( (err.response && err.response.data && err.response.data) || err.message || err.toString() )
                }
            )
    }, [] )
    const [ adminContent, setAdminContent ] = useState( "" )

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{adminContent}</h3>
            </header>
        </div>
    )
}

export default AdminBoard
