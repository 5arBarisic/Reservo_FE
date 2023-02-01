import {useFormik} from "formik";
import React from "react";
import {FormLabel, TextField} from "@mui/material";
import {Textarea} from "@mui/joy";

export type AddMovieProps = {

    title: string;
    description: string;
    duration_min: number | string;

};

const AddMovieForm = () => {


    const handleSubmit = async (values: AddMovieProps) => {

        console.log(values);
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            duration_min: ''
        },
        onSubmit: (values => handleSubmit(values))
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
                <FormLabel sx={{color: "lightblue", fontSize: "20px"}}>Movie title</FormLabel>
                <TextField className="w-full" sx={{fieldset: {borderColor: "gray"}, input: {color: 'white'}}}
                           name="title"
                           onChange={formik.handleChange}/>

                <FormLabel sx={{color: "lightblue", fontSize: "20px"}}>Movie description</FormLabel>
                <Textarea minRows={6} size="lg" sx={{minWidth: "600px", borderColor: "gray", color: "white"}}
                          name="description" onChange={formik.handleChange}/>
                <FormLabel sx={{color: "lightblue", fontSize: "20px",}}>Movie duration</FormLabel>
                <div className="flex flex-row">
                    <TextField sx={{fieldset: {borderColor: "gray"}, maxWidth: "100px", input: {color: 'white'}}}
                               name="duration_min" type="number"
                               onChange={formik.handleChange}/>
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
        </div>
    );
};

export default AddMovieForm;