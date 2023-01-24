import axios, {AxiosResponse} from "axios";
import {RegistrationProps} from "../../components/authentication/RegistrationForm";
import {LoginProps} from "../../components/authentication/LoginForm";


axios.defaults.baseURL = 'http://localhost:8080/api/v1';

const register = async (values: RegistrationProps): Promise<AxiosResponse> => {
    return axios.post("/auth/register", values);
};

const login = async (values: LoginProps): Promise<AxiosResponse> => {
    return axios.post("/auth/authenticate", values);
};


export {register,login}