import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {Paths} from "../../routes/Paths";

const NavBar = ({ids}: { ids: number[] }) => {

    var id = ids[Math.floor(Math.random()*ids.length)];

    return (
        <div className="h-full w-full">
            <nav role="navigation" className=" w-full mx-auto bg-amber-50 -rotate-1">
                <div className=" py-1 mx-12">
                    <ul className="sm:flex  justify-between space-x-10 h-full font-semibold mx-auto uppercase font-sans">
                        <li>
                            <p className="text-amber-500 font-bold text-3xl">*</p>
                        </li>
                        <li className="my-1">
                            <NavLink to={Paths.AboutUs}>Experience the cinema</NavLink>
                        </li>
                        <li>
                            <p className="text-amber-500 font-bold text-3xl">* *</p>
                        </li>
                        <li className="my-1">
                            <NavLink to={`${Paths.Movie}/${id}`}>Random movie</NavLink>

                        </li>
                        <li>
                            <p className="text-amber-500 font-bold text-3xl">* *</p>
                        </li>
                        <li className="my-1">
                            <NavLink to={Paths.Projections}>List of all movies</NavLink>
                        </li>
                        <li>
                            <p className="text-amber-500 font-bold text-3xl">*</p>
                        </li>
                        <li className="my-1">
                            <NavLink to={Paths.TicketInfo}>Ticket info</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;