import {Card, CardContent, CardMedia, Typography} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";
import {Paths} from "../../routes/Paths";

type ItemProps = {
    name: string;
    description: string;
    id:number;
};


const SliderItem = ({name, description,id}: ItemProps) => {

    const navigate = useNavigate();

    return (
        <Card className="min-h-full bg-gradient-to-r from-gray-800 via-gray-900 to-orange-700  flex flex-row justify-center gap-x-72">
            <CardContent className="mt-20 space-y-6">
                <Typography fontWeight="bold" variant="h4" color="white">
                    {name}
                </Typography>
                <Typography variant="h5" color="white">
                    {description}
                </Typography>
                <button
                    className="rounded-3xl p-3 bg-orange-400 hover:text-white  hover:bg-opacity-0 hover:border-2 hover:border-orange-400 font-bold text-lg w-52">
                    Reserve a seat
                </button>
            </CardContent>
            <CardMedia
                sx={{height:"350px", width:"350px", padding:"10px",marginTop:"30px", borderRadius:"20px",transition: "transform 0.15s ease-in-out",
                    "&:hover": { transform: "scale3d(1.05, 1.05, 1)" }}}
                component="img"
                image="https://i.pinimg.com/736x/9e/96/0d/9e960d4b33cafe5b256e034723d5120c.jpg"
                alt="opis slike"
                onClick={()=>navigate(`${Paths.Movie}/${id}`)}
            />
            {/*
            <div className="flex flex-row gap-x-20">
                <div className="flex justify-left flex-col gap-y-6 ml-44 mt-20">
                    <h2 className="text-white text-4xl font-bold mt-10">{name}</h2>
                    <p className="text-white text-xl">{description}</p>
                    <div>
                        <button
                            className="rounded-3xl p-3 bg-orange-400 hover:text-white  hover:bg-opacity-0 hover:border-2 hover:border-orange-400 font-bold text-lg w-52">
                            Reserve a seat
                        </button>
                    </div>
                </div>
                <div className="max-h-fit">
                    <img src="https://flxt.tmsimg.com/assets/p23069_p_v8_aa.jpg" alt="Girl in a jacket" width="auto" height="200"/>
                </div>
            </div>*/}
        </Card>
    );
};

export default SliderItem