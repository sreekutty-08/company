import axios from "axios";
import {SERVER} from "../servers"

const instance = axios.create({
    baseURL:`${SERVER}`
})

export default instance