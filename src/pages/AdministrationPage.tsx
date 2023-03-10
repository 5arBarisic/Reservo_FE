import React, {useCallback, useContext, useEffect, useState} from "react";
import {Box, Tab, Tabs} from "@mui/material";
import HeadBar from "../components/navigation/HeadBar";
import AddMovieForm from "../components/administration/AddMovieForm";
import {Auditorium, Movie, Projection, ReservationResponse} from "../api/Movies/types";
import {getAllAuditoriums, getAllProjections, getAllReservations, getMovies} from "../api/Movies/apiCalls";
import AddProjectionForm from "../components/administration/AddProjectionForm";
import Tickets from "../components/administration/Tickets";
import {AuthContext, getUserEmail} from "../authConfig/Authentication";
import {getUserByEmail} from "../api/Users/apiCalls";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}


function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (

                <div>
                    {children}
                </div>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const AdministrationPage = () => {
    const [value, setValue] = React.useState(0);
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState<Movie[]>([])
    const [auditoriums, setAuditoriums] = useState<Auditorium[]>([]);
    const [projections, setProjections] = useState<Projection[]>([]);
    const [reservations, setReservations] = useState<ReservationResponse[]>([]);
    const [role, setRole] = useState<string>("")
    const {token, saveToken} = useContext(AuthContext);

    const loadMovies = useCallback(async () => {
        setLoading(true);

        await getMovies()
            .then((response) => setMovies(response.data))
            .catch(() => setMovies([]))
            .finally(() => setLoading(false));
    }, [])

    const loadProjections = useCallback(async () => {

        setLoading(true);

        await getAllProjections()
            .then((response) => {
                setProjections(response.data);
            })
            .catch(() => {
                setProjections([])
            })
            .finally(() => setLoading(false));

    }, [])

    const loadReservations = useCallback(async () => {

        setLoading(true);

        await getAllReservations()
            .then((response) => {
                setReservations(response.data);
            })
            .catch(() => {
                setReservations([])
            })
            .finally(() => setLoading(false));

    }, [])

    const loadAuditoriums = useCallback(async () => {
        setLoading(true);

        await getAllAuditoriums()
            .then((response) => setAuditoriums(response.data))
            .catch(() => setAuditoriums([]))
            .finally(() => setLoading(false));
    }, [])

    const loadUser = useCallback(async () => {

        let email = getUserEmail(token);

        await getUserByEmail(email)
            .then((response) => {
                setRole(response.data.role);
            })
            .catch(() => setRole(" "))
    }, [token]);

    useEffect(() => {
        void loadMovies();
        void loadProjections();
        void loadReservations();
        void loadAuditoriums();
        void loadUser()
    }, [loadMovies, loadProjections, loadReservations, loadAuditoriums,loadUser]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    return (
        <div className="mx-auto bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen">
            <HeadBar haveNav={true}/>
            <Box sx={{width: '100%', paddingBottom: "30px"}}>
                <Box sx={{borderBottom: 3, borderColor: 'darkblue', marginX: '310px', marginTop: "20px"}}>
                    <Tabs value={value}
                          onChange={handleChange}
                          centered={true}
                          TabIndicatorProps={{style: {backgroundColor: "inherit"}}}
                    >
                        <Tab label="Movies"
                             sx={{color: "white", fontSize: "25px", marginRight: "40px"}} {...a11yProps(0)} />
                        <Tab label="Projections" sx={{color: "white", fontSize: "25px"}}  {...a11yProps(1)} />
                        <Tab label="Tickets"
                             sx={{color: "white", fontSize: "25px", marginLeft: "40px"}}  {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <AddMovieForm movies={movies} refreshMovies={loadMovies} role={role}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <AddProjectionForm movies={movies} auditoriums={auditoriums} projections={projections} role={role} refreshProjections={loadProjections}/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Tickets reservations={reservations}/>
                </TabPanel>
            </Box>
        </div>
    )
}

export default AdministrationPage;