import React, { useState } from "react"

// Import services
import AuthService from "../services/auth.service"

const Profile = () => {
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser())

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                   {currentUser.username} Profile
                </h3>
            </header>
            <p>
                <strong>Token : </strong>
                {currentUser.accessToken.substring(0,20)} ... {" "}
                {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
            </p>

            <p>
                <strong>ID : </strong>
                {currentUser.id}
            </p>

            <p>
                <strong>Email : </strong>
                {currentUser.email}
            </p>
            <strong>Authorities</strong>
            <ul>
                {currentUser.roles &&
                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
        </div>
    )
}

export default Profile
