import {Card, CardContent, CardMedia, Typography} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";
import {Paths} from "../../routes/Paths";
import {Images} from "../../api/Movies/types";

type ItemProps = {
    name: string;
    description: string;
    id:number;
    images:Images[]|undefined;
};


const SliderItem = ({name, description,id,images}: ItemProps) => {

    const navigate = useNavigate();

    return (
        <Card className="min-h-full bg-gradient-to-r from-gray-800 via-gray-900 to-orange-700  flex flex-row justify-center gap-x-72">
            <CardContent className="mt-20 space-y-6 block">
                <Typography fontWeight="bold" variant="h5" color="white" maxWidth="500px">
                    {name}
                </Typography>
                <Typography variant="h5" color="white" maxWidth="500px" className="line-clamp-3" >
                    {description}
                </Typography>
                <button
                    className="rounded-2xl p-3 bg-orange-400 hover:text-white  hover:bg-opacity-0 hover:border-2 hover:border-orange-400 font-bold text-lg w-52"
                    onClick={()=>navigate(`${Paths.Movie}/${id}`)}
                        >
                    See more
                </button>
            </CardContent>
            { images && <CardMedia
                sx={{height:"350px", width:"350px", padding:"10px",marginTop:"30px", borderRadius:"20px",transition: "transform 0.15s ease-in-out",
                    "&:hover": { transform: "scale3d(1.05, 1.05, 1)" }}}
                component="img"
                image={images[0]?.url}
                alt="opis slike"
                onClick={()=>navigate(`${Paths.Movie}/${id}`)}
            />}
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