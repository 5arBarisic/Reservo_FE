import {Paths} from "./Paths";
import Homepage from "../pages/Homepage";
import MoviePage from "../pages/MoviePage";
import ReservationPage from "../pages/ReservationPage";
import RegistrationPage from "../pages/RegistrationPage";
import LoginPage from "../pages/LoginPage";

type RouteProps = {
    path: string;
    page: () => JSX.Element | null;
};

const RoutesConfig: RouteProps [] = [
    { path: Paths.Home, page: Homepage },
    { path: Paths.Movie +"/:id", page: MoviePage },
    { path: Paths.Reservation +"/:id", page: ReservationPage },
    {path: Paths.Registration, page: RegistrationPage},
    {path: Paths.Login, page: LoginPage}
];

export default RoutesConfig;