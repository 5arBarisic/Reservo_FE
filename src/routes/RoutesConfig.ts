import {Paths} from "./Paths";
import Homepage from "../pages/Homepage";
import MoviePage from "../pages/MoviePage";
import ReservationPage from "../pages/ReservationPage";
import RegistrationPage from "../pages/RegistrationPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import ProjectionsPage from "../pages/ProjectionsPage";
import AdministrationPage from "../pages/AdministrationPage";

type RouteProps = {
    path: string;
    page: () => JSX.Element | null;
};

const RoutesConfig: RouteProps [] = [
    { path: Paths.Home, page: Homepage },
    { path: Paths.Movie +"/:id", page: MoviePage },
    { path: Paths.Reservation +"/:id", page: ReservationPage },
    {path: Paths.Registration, page: RegistrationPage},
    {path: Paths.Login, page: LoginPage},
    {path: Paths.Profile, page: ProfilePage},
    {path: Paths.Projections, page: ProjectionsPage},
    {path: Paths.Administration, page: AdministrationPage}
];

export default RoutesConfig;