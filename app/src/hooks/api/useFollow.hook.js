import axios from "axios"
import { API_PATH } from "../../constants"

export function useFollow() {

    async function follow(params) {
        const apiResponse = await axios.post(`${API_PATH.FOLLOW}/follow/${params.followerId}/${params.followedId}`, params)

        return apiResponse.data
    }

    async function unfollow(params) {
        const apiResponse = await axios.delete(`${API_PATH.FOLLOW}/unfollow/${params.followerId}/${params.followedId}`, params)

        return apiResponse.data
    }

    return {
        follow, unfollow
    }
  }
  