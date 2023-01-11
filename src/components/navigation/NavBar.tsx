import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {

    return (
        <div className="h-full w-full">
            <nav role="navigation" className=" w-full mx-auto bg-amber-50 -rotate-1" >
                <div className=" py-1 mx-12">
                        <ul className="sm:flex  justify-between space-x-10 h-full font-semibold mx-auto uppercase font-sans">
                            <li>
                                <p className="text-amber-500 font-bold text-3xl">*</p>
                            </li>
                            <li >
                                <p className="my-1">Experience the cinema</p>
                            </li>
                            <li>
                                <p className="text-amber-500 font-bold text-3xl">* *</p>
                            </li>
                            <li >
                                <p className="my-1">Events</p>
                            </li>
                            <li>
                                <p className="text-amber-500 font-bold text-3xl">* *</p>
                            </li>
                            <li >
                                <p className="my-1">List of all projections</p>
                            </li>
                            <li>
                                <p className="text-amber-500 font-bold text-3xl">*</p>
                            </li>
                            <li >
                                <NavLink to="/home" className="my-1">Home</NavLink>
                            </li>
                        </ul>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;