import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'https://portfolio-api-bricemangeat.herokuapp.com/api/projects/'

class ProjectService {
    getAllProjects() {
        return axios
            .get( API_URL )
    }

    getOneProject( id ) {
        return axios
            .get( API_URL + id )
    }

    deleteOneProject(id){
        return axios
            .delete(API_URL + id,
                {
                    headers: authHeader(),
                })
    }
}

export default new ProjectService()
