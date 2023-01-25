import axios from "axios";


const getUserByEmail = async (email:string|null|string[]) => {

    return axios.get(`/users/${email}`)
}

export{getUserByEmail}