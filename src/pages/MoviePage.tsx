import React from "react";
import HeadBar from "../components/navigation/HeadBar";


const MoviePage = () => {

    return (
        <div style={{borderRadius:"0 0 200px 0"}} className="mx-auto bg-gradient-to-r from-black via-gray-800 to-orange-500 min-h-fit">
            <HeadBar haveBorder={false}/>
            <div className="flex flex-row justify-between">
                <div className="flex flex-col ml-44 mt-20 gap-y-24 mb-32">
                    <p className="text-white text-6xl "> Movie title</p>
                    <p className="text-white text-2xl">Movie introduction</p>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
};
export default MoviePage;