import React from "react";
import {Rating} from "@mui/material";

const Review = ({name, description, rating}: { name: string, description: string, rating: number }) => {

    return (
        <div className="flex flex-col p-3 items-start bg-gray-100 w-80 rounded-2xl h-80 border-2 border-orange-600 ">
            <div className="flex flex-row gap-x-3">
                <p style={{color: "darkorange"}}>User:{''}</p>
                <p className="text-black">{name}</p>
            </div>
            <div className="flex flex-row gap-x-3">
                <p style={{color: "darkorange"}}>Description:{''}</p>
                <p className="text-black h-56 line-clamp-8">{description}</p>
            </div>
            <div className="flex flex-row gap-x-3">
                <p style={{color: "darkorange"}}>Rating:{''}</p>
                <Rating name="read-only" value={rating} readOnly />
            </div>
        </div>)
}

export default Review;