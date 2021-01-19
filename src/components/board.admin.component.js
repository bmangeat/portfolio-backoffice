import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

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

                                <div className=' btn-group-vertical ml-auto p-2 align-self-center' role="group">


                                    <button type='button' className='btn btn-primary '>
                                        <FontAwesomeIcon icon={faEdit}/>
                                    </button>
                                    <button type='button' className='btn btn-danger' onClick={ProjectService.deleteOneProject(project.id)}>
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </button>
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
