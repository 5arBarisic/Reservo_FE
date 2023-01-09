import React from "react";
import NavBar from "../components/navigation/NavBar";

const Homepage = () => {
    return (
        <div className="mx-auto min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black">
            <div className="space-y-80" >
                <p className="text-white">Pocetna</p>
                <NavBar/>
            </div>

        </div>
    );
};

export default Homepage;