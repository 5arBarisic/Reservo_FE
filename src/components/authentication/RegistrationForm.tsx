import {useFormik} from "formik";
import React, {useContext} from "react";
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import {register} from "../../api/Registration/apiCalls";
import {useNavigate} from "react-router-dom";
import {Paths} from "../../routes/Paths";
import {AuthContext} from "../../authConfig/Authentication";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useNotification} from "use-toast-notification";

export type RegistrationProps = {

    firstName: string;
    lastName: string;
    email: string;
    password: string;

};

const RegistrationForm = () => {

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const {saveToken} = useContext(AuthContext);
    const navigate = useNavigate();
    const notification = useNotification()

    const handleSubmit = async (values: RegistrationProps) => {
        let status: number | undefined;
        let registerResponse: { token: string | undefined } | undefined;

        if (values.firstName === "" || values.lastName === "" || values.email === "" || values.password === "") {
            notification.show({
                message: 'Morate ispuniti sva polja',
                title: 'Greška',
                variant: 'error'
            })
        } else {
            await register(values)
                .then((response) => {
                    registerResponse = response?.data;
                    status = response?.status;
                })
                .catch((errors) => {
                    status = errors.response.status;
                })
            if (registerResponse && status === 200) {
                if (saveToken) saveToken(registerResponse.token);
                navigate(Paths.Home);
            }

        }

    };

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
        onSubmit: (values => handleSubmit(values))
    });

    return (
        <div className="w-96 min-h-fit">
            <form
                className=" text-black my-2  rounded mx-auto px-8 pt-6 mt-10 pb-8 flex flex-col gap-y-10 items-center"
                onSubmit={formik.handleSubmit}>
                <TextField className="w-full" label="First Name" name="firstName" onChange={formik.handleChange}/>
                <TextField className="w-full" label="Last Name" name="lastName" onChange={formik.handleChange}/>
                <TextField className="w-full" label="Email" name="email" type="email" onChange={formik.handleChange}/>
                <FormControl className="w-full" variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                        onChange={formik.handleChange}
                    />
                </FormControl>
                <div className="flex items-center gap-x-20 justify-between">
                    <button
                        className="bg-gray-800 hover:bg-white hover:text-black border hover:border-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign in
                    </button>
                    <button
                        className="bg-white hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={() => navigate(Paths.Login)}
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegistrationForm;