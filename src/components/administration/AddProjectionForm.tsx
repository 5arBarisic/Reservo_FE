import {useFormik} from "formik";
import React, {useRef, useState} from "react";
import {Dayjs} from 'dayjs';
import {
    FormLabel, MenuItem,
    Paper,
    Select, SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField
} from "@mui/material";
import {Auditorium, Movie, Projection, ProjectionRequest} from "../../api/Movies/types";
import {createProjection} from "../../api/Movies/apiCalls";
import {useNotification} from "use-toast-notification";
import {LocalizationProvider, DateTimePicker} from '@mui/x-date-pickers';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {formatDate} from "../../utils/functions";


const auditoriumTest: Auditorium[] = [
    {
        id: 1,
        name: 'Dvorana 1',
        seatsNo: 80
    },
    {
        id: 2,
        name: 'Dvorana 2',
        seatsNo: 64
    },
    {
        id: 3,
        name: 'Dvorana 3',
        seatsNo: 64
    },
    {
        id: 4,
        name: 'Dvorana 4',
        seatsNo: 80
    }
]


const AddProjectionForm = ({
                               movies,
                               projections,
                               refreshProjections
                           }: { movies: Movie[], projections: Projection[], refreshProjections: () => void }) => {

    const [screeningTime, setScreeningTime] = useState<Dayjs | null>(null);
    const [selectedMovie, setSelectedMovie] = useState<number | string>("")
    const [selectedAuditorium, setSelectedAuditorium] = useState<number | string>("")

    const notification = useNotification()
    const ref = useRef<null | HTMLDivElement>(null);


    const handleSelectedMovie = (event: SelectChangeEvent) => {
        setSelectedMovie(event.target.value);
    };

    const handleSelectedAuditorium = (event: SelectChangeEvent) => {
        setSelectedAuditorium(event.target.value);
    };

    const handleSubmit = async () => {

        const newScreeningTime = screeningTime?.format("YYYY-MM-DDTHH:mm:ss.ss");

        const values: ProjectionRequest = {
            screeningTime: newScreeningTime,
            auditorium: {id: Number(selectedAuditorium)},
            movie: {id: Number(selectedMovie)}

        }

        if (screeningTime === null || selectedAuditorium === "" || selectedMovie === "") {
            notification.show({
                message: 'Morate ispuniti sva polja',
                title: 'Greška',
                variant: 'error'
            })
        } else {
            await createProjection(values)
                .catch((error) => {
                    console.log(error.response.data)
                })
                .then(refreshProjections)
                .then(() => {
                    setScreeningTime(null);
                    setSelectedAuditorium("");
                    setSelectedMovie("");
                })
                .finally(
                    () => {
                        notification.show({
                            message: 'Uspješno ste dodali projekciju',
                            title: 'Uspijeh',
                            variant: 'success'
                        })
                        ref.current?.scrollIntoView({behavior: 'smooth'});
                    })
        }

    };

    const formik = useFormik({
        initialValues: {
            screeningTime: '',
            movie: '',
            auditorium: ''

        },
        onSubmit: (values, {resetForm}) => {
            void handleSubmit()
            resetForm();
        }
    });

    return (
        <div
            className="mx-auto max-w-4xl flex flex-col justify-start gap-y-10 bg-gray-700 mt-10 shadow-md shadow-blue-600 rounded-xl p-10">
            <div className="flex justify-start">
                <p className="text-white text-3xl"> Add projection</p>
            </div>
            <form
                className=" my-2  rounded mx-auto px-8 pt-6pb-8 flex flex-col gap-y-5 items-center"
                onSubmit={formik.handleSubmit}>

                <FormLabel sx={{color: "lightblue", fontSize: "20px"}}>Movie</FormLabel>
                <Select
                    MenuProps={{style: {maxHeight: 200}}}
                    value={selectedMovie.toString()}
                    onChange={handleSelectedMovie}
                    sx={{minWidth: "600px", fieldset: {borderColor: "gray"}, color: "white"}}
                >
                    {movies.length > 0 && movies.map((movie) => {
                        return <MenuItem key={movie.id} value={movie.id}>{movie.title}</MenuItem>
                    })}

                </Select>
                <FormLabel sx={{color: "lightblue", fontSize: "20px"}}>Auditorium</FormLabel>
                <Select
                    MenuProps={{style: {maxHeight: 200}}}
                    value={selectedAuditorium.toString()}
                    onChange={handleSelectedAuditorium}
                    sx={{minWidth: "300px", fieldset: {borderColor: "gray"}, color: "white"}}
                >
                    {auditoriumTest.length > 0 && auditoriumTest.map((auditorium) => {
                        return <MenuItem key={auditorium.id} value={auditorium.id}>{auditorium.name}</MenuItem>
                    })}

                </Select>
                <FormLabel sx={{color: "lightblue", fontSize: "20px"}}>Screening time</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        openTo="year"
                        disablePast={true}
                        ampm={false}
                        value={screeningTime}
                        inputFormat="DD/MM/YYYY HH:mm"
                        onChange={(newValue: Dayjs | null) => {
                            setScreeningTime(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} sx={{
                            fieldset: {borderColor: "gray"},
                            input: {color: "white"}
                        }}/>}
                    />
                </LocalizationProvider>
                <div className="flex items-center gap-x-20 justify-between mt-2">
                    <button
                        className="bg-white text-blue-700 hover:bg-blue-700 hover:text-white border hover:border-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Add projection
                    </button>
                </div>
            </form>
            <hr className="text-gray-700"/>

            <p className="text-3xl text-white">List of projections</p>
            <div ref={ref}>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{color: "blue", fontSize: "20px"}}>Movie title</TableCell>
                                <TableCell sx={{color: "blue", fontSize: "20px"}} align="center">Duration</TableCell>
                                <TableCell sx={{color: "blue", fontSize: "20px"}} align="center">Auditorium</TableCell>
                                <TableCell sx={{color: "blue", fontSize: "20px"}} align="center">Screening
                                    time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {projections.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row" align="left">
                                        {row.movie.title}
                                    </TableCell>
                                    <TableCell align="center">{row.movie.duration_min}{' min'}</TableCell>
                                    <TableCell align="center">{row.auditorium.name}</TableCell>
                                    <TableCell align="center">{formatDate(row.screeningTime)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default AddProjectionForm;