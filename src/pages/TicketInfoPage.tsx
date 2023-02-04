import React from "react";
import HeadBar from "../components/navigation/HeadBar";
import {Movie} from "@mui/icons-material";


const TicketInfo = () => {

    return (
        <div className="min-h-screen bg-gradient-to-r from-orange-600 to-orange-500">
            <div className="bg-gray-800">
                <HeadBar haveBorder={false}/>
            </div>
            <div className="flex flex-row mt-4 ml-8">
                <Movie sx={{width: 100, height: 100}}/>
                <p className="text-5xl mt-6 ml-2">RESERVO</p>
            </div>
            <hr className=" h-1 bg-black border-0 w-96 ml-4"/>
            <div className="flex flex-row justify-center gap-x-10">
                <div className="h-80 rounded-3xl bg-gray-800 p-3 px-4 mt-6  max-w-lg">
                    <div className="text-left">
                        <p className="text-yellow-400 text-3xl">Tickets: </p>
                        <p className="text-white text-xl ">Regular seat: 5 euros</p>
                        <p className="text-white text-xl "> VIP seat: 8 euros</p>
                    </div>
                    <div className="text-right mt-7">
                        <p className="text-yellow-400 text-3xl"> Loyalty rewards:</p>
                        <p className="text-white text-xl "> Watch your new favorite movies even more frequently, but under big discounts by collecting loyalty points!</p>
                        <p className="text-white text-xl "> Per regular seat you get 1 points</p>
                        <p className="text-white text-xl "> Per VIP seat you get 3 points</p>
                    </div>
                </div>

            </div>
            <p className="text-white font-bold text-6xl text-right mt-16 mr-8">TICKET INFO & REWARDS</p>
        </div>
    );
};

export default TicketInfo;