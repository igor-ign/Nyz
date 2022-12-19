import axios from "axios"
import { API_PATH } from "../../constants"

export function useUser() {

    async function login(params) {
        const apiResponse = await axios.post(API_PATH.LOGIN, params)

        return apiResponse.data
    }

    async function register(params) {
        const apiResponse = await axios.post(API_PATH.REGISTER, params)

        return apiResponse.data
    }
  
    return {
        login, register
    }
  }
  