import { Card} from "@mui/material";
import React from "react";

type ItemProps = {
    name: string;
    description: string;
};

const SliderItem = ({name, description}: ItemProps) => {
    return (
        <Card className="min-h-full bg-gradient-to-r from-black via-gray-800 to-orange-800">
            <div className="flex justify-left flex-col gap-y-6 ml-44 mt-20">
                <h2 className="text-white text-4xl font-bold mt-10">{name}</h2>
                <p className="text-white text-xl">{description}</p>
                <div>
                    <button className="rounded-3xl p-3 bg-orange-400 hover:text-white  hover:bg-opacity-0 hover:border-2 hover:border-orange-400 font-bold text-lg w-52">
                        Reserve a seat
                    </button>
                </div>
            </div>
        </Card>
    );
};

export default SliderItem