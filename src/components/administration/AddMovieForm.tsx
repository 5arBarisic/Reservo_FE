import {useFormik} from "formik";
import React, {useRef, useState} from "react";
import {
    FormLabel,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import {Textarea} from "@mui/joy";
import {Movie, MovieRequest} from "../../api/Movies/types";
import {createMovie} from "../../api/Movies/apiCalls";
import {useNotification} from "use-toast-notification";


const AddMovieForm = ({movies, refreshMovies}: { movies: Movie[], refreshMovies: () => void }) => {

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [duration, setDuration] = useState<number | string>("");
    const [trailer, setTrailer] = useState<string>("");
    const [images, setImages] = useState<string[]>([""]);
    const notification = useNotification()
    const ref = useRef<null | HTMLDivElement>(null);

    const handleSubmit = async () => {

        const newTitle = title.toUpperCase()
        const newDescription = description.charAt(0).toUpperCase() + description.slice(1);

        const values: MovieRequest = {
            title: newTitle,
            images: images,
            description: newDescription,
            duration_min: Number(duration),
            trailer: trailer
        }
        if (title === "" || description === "" || duration === "" || trailer === "" || images[0] === "") {
            notification.show({
                message: 'Morate ispuniti sva polja',
                title: 'Greška',
                variant: 'error'
            })
        } else {
            await createMovie(values)
                .catch((error) => {
                    console.log(error.response.data)
                })
                .then(refreshMovies)
                .then(() => {
                    setTitle("");
                    setDescription("");
                    setDuration("");
                    setTrailer("");
                    setImages([""]);
                })
                .finally(
                    () => {
                        notification.show({
                            message: 'Uspješno ste dodali film',
                            title: 'Uspijeh',
                            variant: 'success'
                        })
                        ref.current?.scrollIntoView({behavior: 'smooth'});
                    })
        }
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            duration_min: 0,
            trailer: '',
            images: ['']
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
                <p className="text-white text-3xl"> Add movie</p>
            </div>
            <form
                className=" my-2  rounded mx-auto px-8 pt-6pb-8 flex flex-col gap-y-5 items-center"
                onSubmit={formik.handleSubmit}>
                <FormLabel sx={{color: "lightblue", fontSize: "20px"}}>Title</FormLabel>
                <TextField className="w-full" sx={{fieldset: {borderColor: "gray"}, input: {color: 'white'}}}
                           name="title"
                           value={title}
                           onChange={(newValue) => {
                               setTitle(newValue.target.value);
                           }}
                />

                <FormLabel sx={{color: "lightblue", fontSize: "20px"}}>Description</FormLabel>
                <Textarea minRows={6} size="lg" sx={{minWidth: "600px", borderColor: "gray", color: "white"}}
                          name="description"
                          value={description}
                          onChange={(newValue) => {
                              setDescription(newValue.target.value);
                          }}/>
                <FormLabel sx={{color: "lightblue", fontSize: "20px"}}>Trailer link</FormLabel>
                <TextField className="w-full" sx={{fieldset: {borderColor: "gray"}, input: {color: 'white'}}}
                           name="trailer"
                           value={trailer}
                           onChange={(newValue) => {
                               setTrailer(newValue.target.value);
                           }}
                />
                <FormLabel sx={{color: "lightblue", fontSize: "20px"}}>Image link</FormLabel>
                <TextField className="w-full" sx={{fieldset: {borderColor: "gray"}, input: {color: 'white'}}}
                           name="images"
                           value={images}
                           onChange={(newValue) => {
                               setImages([newValue.target.value]);
                           }}
                />
                <FormLabel sx={{color: "lightblue", fontSize: "20px",}}>Duration</FormLabel>
                <div className="flex flex-row">
                    <TextField sx={{fieldset: {borderColor: "gray"}, maxWidth: "100px", input: {color: 'white'}}}
                               name="duration_min" type="number"
                               value={duration}
                               onChange={(newValue) => {
                                   setDuration(newValue.target.value);
                               }}/>
                    <p className="text-white text-xl mt-7 ml-2">min</p>
                </div>
                <div className="flex items-center gap-x-20 justify-between mt-2">
                    <button
                        className="bg-white text-blue-700 hover:bg-blue-700 hover:text-white border hover:border-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Add movie
                    </button>
                </div>
            </form>
            <hr className="text-gray-700"/>

            <p className="text-3xl text-white">List of movies</p>
            <div ref={ref}>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{color: "blue", fontSize: "20px"}}>Movie title</TableCell>
                                <TableCell sx={{color: "blue", fontSize: "20px"}} align="center">Description</TableCell>
                                <TableCell sx={{color: "blue", fontSize: "20px"}} align="center">Duration</TableCell>
                                <TableCell sx={{color: "blue", fontSize: "20px"}} align="center">Rating</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {movies.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row" align="left">
                                        {row.title}
                                    </TableCell>
                                    <TableCell align="center">{row.description}</TableCell>
                                    <TableCell align="center">{row.duration_min}{' min'}</TableCell>
                                    <TableCell align="center">{row.currentRating}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default AddMovieForm;