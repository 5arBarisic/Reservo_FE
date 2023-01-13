import React from "react";
import HeadBar from "../components/navigation/HeadBar";
import {CardMedia} from "@mui/material";


const MoviePage = () => {
    const projections = ["22.1.2023", "23.1.2023", "24.1.2023.", "23.1.2023", "24.1.2023.","22.1.2023", "23.1.2023", "24.1.2023.", "23.1.2023", "24.1.2023."];
    const numOfProjections = projections?.length;

    return (
        <div style={{borderRadius:"0 0 200px 0"}} className="mx-auto bg-gradient-to-r from-black via-gray-800 to-orange-500 min-h-fit">
            <HeadBar haveBorder={false}/>
            <div className="flex flex-row justify-between">
                <div className="flex flex-col ml-44 mt-20 gap-y-20 mb-32">
                    <p className="text-white text-6xl "> Movie title</p>
                    <p className="text-white text-2xl">Movie introduction</p>
                    <div className=" flex justify-between px-20">
                        <button className="text-white border border-gray-400 rounded-lg p-2 hover:bg-orange-500 hover:border-orange-500">Reserve a seat</button>
                        <button className="text-white border border-gray-400 rounded-lg p-2 hover:bg-orange-500 hover:border-orange-500">Learn more</button>
                    </div>
                    <div className="grid grid-cols-5 gap-x-6 gap-y-5">
                        {numOfProjections > 0 && projections?.map((projection)=>{
                            return <button className="text-white border border-gray-400 rounded-lg p-2 hover:bg-orange-500 hover:border-orange-500">
                                {projection}
                            </button>
                        } )}
                    </div>
                </div>
                <div>
                    <CardMedia
                        sx={{height:"450px", width:"450px", padding:"10px",marginTop:"10px",marginBottom:"10px",marginRight:"200px" ,borderRadius:"20px", opacity:"40%"}}
                        component="img"
                        image="https://i.pinimg.com/736x/9e/96/0d/9e960d4b33cafe5b256e034723d5120c.jpg"
                        alt="opis slike"
                    />
                </div>
            </div>
        </div>
    );
};
export default MoviePage;