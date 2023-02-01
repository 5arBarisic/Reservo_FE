import React from "react";
import {Box, Tab, Tabs} from "@mui/material";
import HeadBar from "../components/navigation/HeadBar";
import AddMovieForm from "../components/administration/AddMovieForm";


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

                <div >
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

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    return (
        <div className="mx-auto bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen">
            <HeadBar haveNav={true}/>
            <Box sx={{width: '100%',paddingBottom:"30px"}}>
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
                    <AddMovieForm/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <AddMovieForm/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <AddMovieForm/>
                </TabPanel>
            </Box>
        </div>
    )
}

export default AdministrationPage;