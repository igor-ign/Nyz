import axios from "axios"
import { API_PATH } from "../../constants"

export function usePost() {

    async function addPost(params) {
        const apiResponse = await axios.post(`${API_PATH.POST}/add`, params)

        return apiResponse.data
    }

    async function getPosts(params) {
        const apiResponse = await axios.get(`${API_PATH.POST}/${params}?size=3`)

        return apiResponse.data
    }

    return {
        addPost, getPosts
    }
  }
  