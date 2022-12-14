import axios from 'axios'
import { API_PATH } from '../../constants'

export function useUser() {

    async function login(params) {
        const apiResponse = await axios.post(`${API_PATH.USER}/login`, params)

        return apiResponse.data
    }
  
    return {
        login
    }
  }
  