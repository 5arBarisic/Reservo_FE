import React from "react";
import NavBar from "../components/navigation/NavBar";
import Slider from "../components/carousel/Slider";

const Homepage = () => {
    return (
        <div className="mx-auto min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black">
            <div className="space-y-10" >
                <Slider/>
                <NavBar/>
            </div>

        </div>
    );
};

export default Homepage;