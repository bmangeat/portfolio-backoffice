import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'https://portfolio-api-bricemangeat.herokuapp.com/api/projects/'

class ProjectService {
    getAllProjects() {
        return axios
            .get( API_URL, { headers: authHeader() } )
    }
}

export default new ProjectService()
