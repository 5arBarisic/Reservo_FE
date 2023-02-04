import React from "react";
import HeadBar from "../components/navigation/HeadBar";
import {Avatar} from "@mui/material";
import {Movie} from "@mui/icons-material";


const ekipa = [
    {
        id: 1,
        ime: 'Magdalena',
        slike: 'https://imgix.bustle.com/uploads/image/2022/9/13/07c84baf-bff1-40c8-a801-06edfbc8cec6-img_3906.jpg?w=1200&h=630&fit=crop&crop=focalpoint&fm=jpg&fp-x=0.468&fp-y=0.2346'
    },
    {
        id: 2,
        ime: 'Marko',
        slike: 'https://media0004.elcinema.com/uploads/_315x420_68d16f17af5d649eb86b1d5b6775b7b44521f1f104c67ee56772eebd7d6b496c.jpg'
    },
    {
        id: 3,
        ime: 'Fran',
        slike: 'https://media0004.elcinema.com/uploads/_315x420_68d16f17af5d649eb86b1d5b6775b7b44521f1f104c67ee56772eebd7d6b496c.jpg'
    },
    {
        id: 4,
        ime: 'Ana-Marija',
        slike: 'https://imgix.bustle.com/uploads/image/2022/9/13/07c84baf-bff1-40c8-a801-06edfbc8cec6-img_3906.jpg?w=1200&h=630&fit=crop&crop=focalpoint&fm=jpg&fp-x=0.468&fp-y=0.2346'
    },
]

const ekipa2 = [
    {
        id: 5,
        ime: 'Laura',
        slike: 'https://imgix.bustle.com/uploads/image/2022/9/13/07c84baf-bff1-40c8-a801-06edfbc8cec6-img_3906.jpg?w=1200&h=630&fit=crop&crop=focalpoint&fm=jpg&fp-x=0.468&fp-y=0.2346'
    },
    {
        id: 6,
        ime: 'Ante',
        slike: 'https://media0004.elcinema.com/uploads/_315x420_68d16f17af5d649eb86b1d5b6775b7b44521f1f104c67ee56772eebd7d6b496c.jpg'
    },
    {
        id: 7,
        ime: 'Petar',
        slike: 'https://media0004.elcinema.com/uploads/_315x420_68d16f17af5d649eb86b1d5b6775b7b44521f1f104c67ee56772eebd7d6b496c.jpg'
    }
]

const AboutUsPage = () => {

    return (
        <div className="min-h-screen bg-orange-400">
            <div className="bg-gray-800">
                <HeadBar haveBorder={false}/>
            </div>
            <div className="flex flex-row mt-4 ml-8">
                <Movie sx={{width: 100, height: 100}} />
                <p className="text-5xl mt-6 ml-2">RESERVO</p>
            </div>
            <hr className=" h-1 bg-black border-0 w-96 ml-4"/>
            <div className="flex flex-row justify-center gap-x-10">
                <div className="h-80 rounded-3xl bg-gray-800 p-3 mt-16 max-w-lg text-center ">
                    <p className="text-white text-2xl">THANK YOU FOR BEING HERE </p>
                    <p className="text-white text-xl mt-5"> it is our privilege to have you in our home which we
                        wishfully created
                        for people to enjoy their free time.</p>
                    <p className="text-white text-xl mt-5"> may you have beautiful time in our accommodation</p>
                    <p className="text-white text-xl mt-5"> yours truly,</p>
                    <p className="text-white text-xl mt-5"> RESERVO</p>
                    <p className="text-white text-xl mt-5"> for any inquiries: reservo@net.hr</p>
                </div>
                <div className="mt-24">
                    <div className="flex flex-row gap-x-6">
                        {ekipa.map((clan) => {
                            return <div key={clan.id} className="flex flex-col gap-y-1  text-center">
                                <Avatar  src={clan.slike} sx={{width: 100, height: 100}}/> <p
                                className="text-white"> {clan.ime}</p>
                            </div>
                        })}
                    </div>
                    <div className="flex flex-row gap-x-6 justify-center">
                        {ekipa2.map((clan) => {
                            return <div key={clan.id} className="flex flex-col gap-y-1  text-center">
                                <Avatar src={clan.slike} sx={{width: 100, height: 100}}/> <p
                                className="text-white"> {clan.ime}</p>
                            </div>
                        })}
                    </div>
                </div>
            </div>
            <div className="text-center mt-10">
                <p className="text-white text-3xl">A platform for beautifying life by showcasing cinematic
                    exceptionality </p>
            </div>
        </div>
    );
};

export default AboutUsPage;