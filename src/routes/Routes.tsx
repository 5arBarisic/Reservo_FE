import React from "react";
import {Route, Routes as RouteManager } from "react-router-dom";
import RoutesConfig from "./RoutesConfig";
const Routes = () => {
    return (
        <RouteManager>
            {RoutesConfig.map((route)=>{
                return<Route element={<route.page/>} key = {route.path} path={route.path}/>
            })

            }
        </RouteManager>
    );
};
export default Routes;