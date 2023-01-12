import {Paths} from "./Paths";
import Homepage from "../pages/Homepage";
import MoviePage from "../pages/MoviePage";

type RouteProps = {
    path: string;
    page: () => JSX.Element | null;
};

const RoutesConfig: RouteProps [] = [
    { path: Paths.Home, page: Homepage },
    { path: Paths.Movie +"/:id", page: MoviePage }
];

export default RoutesConfig;