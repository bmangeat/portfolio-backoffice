import React, { useEffect, useState } from "react"

import UserService from "../services/user.service"

const Home = () => {
    useEffect(()=>{
        UserService.getPublicContent()
            .then(
                response => {
                    setHomeContent(response.data)
                },
                err => {
                    setHomeContent((err.response && err.response.data) || err.message || err.toString())
                }
            )
    })

    const [homeContent, setHomeContent] = useState("")

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{homeContent}</h3>
            </header>
        </div>
    )
}

export default Home
