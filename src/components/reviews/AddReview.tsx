import React, {useState} from "react";
import {FormLabel, Rating} from "@mui/material";
import {Textarea} from "@mui/joy";
import {useFormik} from "formik";
import {ReviewRequest} from "../../api/Movies/types";
import {createReview} from "../../api/Movies/apiCalls";
import {useNotification} from "use-toast-notification";

const AddReview = ({name, movieId, userId, refreshReviews}: { name: string, movieId: number | string, userId: number ,refreshReviews: () => void}) => {
    const [description, setDescription] = useState<string>("");
    const [rating, setRating] = useState<number | null | undefined>(0);
    const notification = useNotification()

    const handleSubmit = async () => {

        const values: ReviewRequest = {
            rating: rating,
            description: description,
            userId: userId
        }
        console.log(values)
        if (description === "" || rating === undefined || rating === null) {
            notification.show({
                message: 'Morate ispuniti sva polja',
                title: 'Greška',
                variant: 'error'
            })
        } else {
            let newError=0;
            await createReview(movieId, values)
                .catch((error) => {
                    if (error.response.status === 403) {
                        newError = 403;
                        notification.show({
                            message: 'Već ste komentirali ovaj film',
                            title: 'Greška',
                            variant: 'error'
                        })
                    }
                })
                .then(refreshReviews)
                .then(() => {
                    setRating(0);
                    setDescription("");
                })
                .then(() => {
                    if (newError !== 403) {
                        notification.show({
                            message: 'Uspješno ste dodali komentar',
                            title: 'Uspijeh',
                            variant: 'success'
                        })
                    }
                })

        }
    };

    const formik = useFormik({
        initialValues: {
            rating: 0,
            description: '',
            userId: 0,
        },
        onSubmit: (values, {resetForm}) => {
            void handleSubmit()
            resetForm();
        }
    });

    return (
        <div className="flex flex-col p-3 items-start h-80 bg-gray-100 w-80 rounded-2xl border-2 border-orange-600">
            <div className="flex flex-row gap-x-3">
                <p style={{color: "darkorange"}}>User:{''}</p>
                <p className="text-black ">{name}</p>
            </div>
            <form
                className="my-2  pb-8 flex flex-col gap-y-2 items-center "
                onSubmit={formik.handleSubmit}>
                <div className="flex flex-row gap-x-2">
                    <FormLabel sx={{color: "darkorange", fontSize: "15px"}}>Description: </FormLabel>
                    <Textarea maxRows={6} minRows={6} size="lg"
                              sx={{minWidth: "100px", borderColor: "gray", color: "black"}}
                              name="description"
                              value={description}
                              onChange={(newValue) => {
                                  setDescription(newValue.target.value);
                              }}/>
                </div>
                <div className="flex flex-row gap-x-2">
                    <FormLabel sx={{color: "darkorange", fontSize: "15px"}}>Rating: </FormLabel>
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}
                    />
                </div>
                <div className="flex justify-center mt-2">
                    <button
                        className="bg-white text-orange-600 hover:bg-orange-600 hover:text-white border hover:border-blue font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Add review
                    </button>
                </div>
            </form>
        </div>)
}

export default AddReview;