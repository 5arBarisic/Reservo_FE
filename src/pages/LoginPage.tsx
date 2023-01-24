import React from "react";
import loginImage from "../images/login.png"
import {Movie} from "@mui/icons-material";
import LoginForm from "../components/authentication/LoginForm";

const LoginPage = () => {
    return (
        <div className="min-h-screen flex items-center bg-amber-50">
        <div className="grid grid-cols-2 container shadow-xl bg-white ">
            <div className="flex flex-col justify-center  ml-44">
                <div className="flex flex-row ml-28 ">
                    <Movie fontSize="large" sx={{mr: 1}}/>
                    <p className="text-3xl">RESERVO</p>
                </div>
                <div className="mt-10">
                    <p className="text-2xl font-semibold">The cinema has no boundary; it is a</p>
                    <p className="text-2xl font-semibold"> ribbon of dream.</p>
                    <p className="text-xl text-gray-700">- Orson Welles</p>
                </div>
                <div className="mt-10">
                    <p className="text-xl ">Welcome Back, Please login to your account</p>

                </div>
                <LoginForm/>
            </div>
            <div className="bg-amber-600 flex justify-center">
                <img src={loginImage} alt="login" style={{width: "auto", height: "600px"}}/>
            </div>
        </div>
        </div>
    );
};

export default LoginPage;