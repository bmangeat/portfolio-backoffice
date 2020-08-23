import React, {Component} from "react"

import UserService from "../services/user.service"

export default class ModBoard extends Component{
    constructor(props) {
        super(props);

        this.state = {
            content : ""
        }
    }

    componentDidMount() {
        UserService.getModBoard()
            .then(
                response => {
                    this.setState({
                        content: response.data
                    })
                },
                err => {
                    this.setState({
                        content : (err.response && err.response.data && err.response.data) || err.message || err.toString()
                    })
                }
            )
    }

    render() {
        return(
            <div className="container">
                <header className="jumbotron">
                    <h3>{this.state.content}</h3>
                </header>
            </div>
        )
    }

}