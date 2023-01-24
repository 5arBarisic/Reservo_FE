import React from "react";
import RegistrationForm from "../components/authentication/RegistrationForm";
import registrationImage from "../images/registration.png"
import {Movie} from "@mui/icons-material";

const RegistrationPage = () => {
    return (
        <div className="min-h-screen flex items-center bg-amber-50">
            <div className="grid grid-cols-2 container shadow-xl bg-amber-600 ">
                <div className="flex flex-col justify-center ml-36 text-white ">
                    <div className="mt-10">
                        <p className="text-2xl font-semibold">Cinema is the most beautiful fraud</p>
                        <p className="text-2xl font-semibold"> in the world</p>
                        <p className="text-xl text-white">- Jean Luc Godard</p>
                    </div>
                    <div className="mt-16">
                        <p className="text-xl font-bold ">Register and prepare yourself for an utter experience!</p>

                    </div>
                    <img style={{width: "500px", height: "auto", marginTop: "20px"}}
                         src={registrationImage}
                         alt="registraton"/>
                </div>
                <div className="bg-white flex flex-col items-center">
                    <div className="flex flex-row mt-4">
                        <Movie fontSize="large" sx={{mr: 1}}/>
                        <p className="text-3xl">RESERVO</p>
                    </div>
                    <div>
                        <RegistrationForm/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;