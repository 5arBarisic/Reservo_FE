import {Card, CardContent, CardMedia, Typography} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";
import {Paths} from "../../routes/Paths";
import {Images} from "../../api/Movies/types";

type ItemProps = {
    name: string;
    description: string;
    id: number;
    images: Images[] | undefined;
    inSlider?: boolean
};


const CardItem = ({name, description, id, images, inSlider = false}: ItemProps) => {

    const navigate = useNavigate();

    return (
        <Card
            className={`min-h-full  bg-gradient-to-r from-gray-800 via-gray-900 to-orange-700 flex flex-row ${inSlider ? 'justify-center gap-x-72' : 'justify-between px-10 hover:scale-110'}`}
            style={{borderRadius: inSlider ? 'none' : '20px'}}>
            <CardContent className={` ${inSlider ? 'mt-20' : 'mt-10'} space-y-6 block`}>
                <Typography fontWeight="bold" variant={`${inSlider ? 'h5' : 'h6'}`} color="white" maxWidth="500px">
                    {name}
                </Typography>
                <Typography variant={`${inSlider ? 'h5' : 'h6'}`} color="white" maxWidth="500px"
                            className="line-clamp-3">
                    {description}
                </Typography>
                <button
                    className="rounded-2xl p-3 bg-orange-400 hover:text-white  hover:bg-opacity-0 hover:border-2 hover:border-orange-400 font-bold text-lg w-52"
                    onClick={() => navigate(`${Paths.Movie}/${id}`)}
                >
                    See more
                </button>
            </CardContent>
            {images && <CardMedia
                sx={{
                    height: inSlider ? "350px" : "300px",
                    width: inSlider ? "350px" : "300px",
                    padding: "10px",
                    marginTop: inSlider ? "30px" : "15px",
                    marginBottom: inSlider ? "" : "12px",
                    borderRadius: "20px",
                    transition: "transform 0.15s ease-in-out",
                    "&:hover": {transform: inSlider ? "scale3d(1.05, 1.05, 1)":""}
                }}
                component="img"
                image={images[0]?.url}
                alt="opis slike"
                onClick={() => navigate(`${Paths.Movie}/${id}`)}
            />}
        </Card>
    );
};

export default CardItem