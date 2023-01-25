import {useFormik} from "formik";
import React, {useContext} from "react";
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import {login} from "../../api/Registration/apiCalls";
import {useNavigate} from "react-router-dom";
import {Paths} from "../../routes/Paths";
import {AuthContext} from "../../authConfig/Authentication";
import {Visibility, VisibilityOff} from "@mui/icons-material";

export type LoginProps = {
    email: string;
    password: string;

};

const LoginForm = () => {

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const {saveToken} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (values: LoginProps) => {
        let status: number | undefined;
        let loginResponse: { token: string | undefined } | undefined;

        await login(values)
            .then((response) => {
                loginResponse = response?.data;
                status = response?.status;
            })
            .catch((errors) => {
                status = errors.response.status;
            })
        if (loginResponse && status === 200) {
            if (saveToken) saveToken(loginResponse.token);
            navigate(Paths.Home);
        }


    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values => handleSubmit(values))
    });

    return (
        <div className="w-96 min-h-fit">
            <form
                className=" text-black my-2  rounded mx-auto px-8 pt-6 mt-10 pb-8  flex flex-col gap-y-10 items-center"
                onSubmit={formik.handleSubmit}>
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
                        Login
                    </button>
                    <button
                        className="bg-white hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={() => navigate(Paths.Registration)}
                    >
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;