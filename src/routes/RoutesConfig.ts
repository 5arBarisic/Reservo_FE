import {Paths} from "./Paths";
import Homepage from "../pages/Homepage";
import MoviePage from "../pages/MoviePage";
import ReservationPage from "../pages/ReservationPage";
import RegistrationPage from "../pages/RegistrationPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import ProjectionsPage from "../pages/ProjectionsPage";
import AdministrationPage from "../pages/AdministrationPage";
import AboutUsPage from "../pages/AboutUsPage";
import TicketInfoPage from "../pages/TicketInfoPage";

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
    {path: Paths.Administration, page: AdministrationPage},
    {path: Paths.AboutUs, page: AboutUsPage},
    {path: Paths.TicketInfo, page: TicketInfoPage}
];

export default RoutesConfig;