import React, { useEffect, useState } from "react"

import UserService from "../services/user.service"
import ProjectService from '../services/project.service'

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
        ProjectService.getAllProjects()
            .then(
                response => {
                    setProjects( response.data )
                },
                err => {
                    setProjects( (err.response && err.response.data && err.response.data) || err.message || err.toString )
                }
            )

    }, [] )
    const [ adminContent, setAdminContent ] = useState( "" )
    const [ projects, setProjects ] = useState( [] )
    console.log( projects )

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{adminContent}</h3>
            </header>
            <main>
                <ul className='list-group'>
                    {
                        projects.map( project =>
                            <li key={project.id} className='list-group-item d-flex'>
                                <img className='p-2' src="http://placehold.it/256/163a63" alt=""/>
                                <div className='p-2 align-self-center'>
                                    <h4>{project.name}</h4>
                                    <p className='list-group-item-text'>{project.description}</p>
                                </div>

                                <div className='ml-auto p-2 align-self-center'>

                                    <button className='btn btn-primary btn-sm'>Edit</button>
                                    <button className='btn btn-danger btn-sm'>Delete</button>
                                </div>

                            </li>
                        )
                    }

                </ul>
            </main>
        </div>
    )
}

export default AdminBoard
