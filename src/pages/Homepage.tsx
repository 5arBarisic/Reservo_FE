import React from "react";
import Slider from "../components/carousel/Slider";
import HeadBar from "../components/navigation/HeadBar";

const Homepage = () => {

    return (
        <div className="mx-auto bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen">
            <div className="space-y-4" >
                <HeadBar haveNav={false}/>
                <Slider/>
            </div>

        </div>
    );
};

export default Homepage;