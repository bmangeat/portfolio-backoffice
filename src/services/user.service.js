import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'https://portfolio-api-bricemangeat.herokuapp.com/api/access/'

class UserService {
    getPublicContent() {
        return axios
            .get( API_URL + `public` )
    }

    getUserBoard() {
        return axios
            .get( API_URL + `user`, { headers: authHeader() } )
    }

    getModBoard() {
        return axios
            .get( API_URL + `mod`, { headers: authHeader() } )
    }

    getAdminBoard() {
        return axios
            .get( API_URL + `admin`, { headers: authHeader() } )
    }
}

export default new UserService()
