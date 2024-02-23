import {
    Box,
    Button,
    FormControl,
    Stack,
    TextField,
    Link as MuiLink
} from "@mui/material";
import { Link } from "react-router-dom";
import { Field, Form } from "react-final-form";

import { Paper } from "components";

import { validateRegistration } from "../utils";
import { useAuth } from "../hooks";
import { UserSignUpData } from "../types";

export const RegistrationForm = () => {
    const { handleRegister } = useAuth();

    const onSubmit = (values: UserSignUpData) => {
        handleRegister(values);
    };

    return (
        <Paper sx={{ width: "100%" }}>
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit }) => (
                    <Box component="form" onSubmit={handleSubmit}>
                        <Stack direction="column" spacing={2} padding={3}>
                            <FormControl required>
                                <Field
                                    name="email"
                                    render={({
                                        input: { value, onChange },
                                        meta: { touched, error }
                                    }) => (
                                        <TextField
                                            label="Email"
                                            type="email"
                                            {...{
                                                error: Boolean(
                                                    touched && error
                                                ),
                                                value,
                                                onChange
                                            }}
                                            helperText={touched && error}
                                        />
                                    )}
                                />
                            </FormControl>
                            <FormControl required>
                                <Field
                                    name="password"
                                    render={({
                                        input: { value, onChange },
                                        meta: { touched, error }
                                    }) => (
                                        <TextField
                                            label="Password*"
                                            type="password"
                                            {...{
                                                error: Boolean(
                                                    touched && error
                                                ),
                                                value,
                                                onChange
                                            }}
                                            helperText={touched && error}
                                        />
                                    )}
                                />
                            </FormControl>
                            <FormControl required>
                                <Field
                                    name="confirmation"
                                    render={({
                                        input: { value, onChange },
                                        meta: { touched, error }
                                    }) => (
                                        <TextField
                                            label="Confirm password*"
                                            type="password"
                                            {...{
                                                error: Boolean(
                                                    touched && error
                                                ),
                                                value,
                                                onChange
                                            }}
                                            helperText={touched && error}
                                        />
                                    )}
                                />
                            </FormControl>
                            <FormControl>
                                <Field
                                    name="firstName"
                                    render={({
                                        input: { value, onChange },
                                        meta: { touched, error }
                                    }) => (
                                        <TextField
                                            label="First name"
                                            type="text"
                                            {...{
                                                error: Boolean(
                                                    touched && error
                                                ),
                                                value,
                                                onChange
                                            }}
                                            helperText={touched && error}
                                        />
                                    )}
                                />
                            </FormControl>
                            <FormControl>
                                <Field
                                    name="lastName"
                                    render={({
                                        input: { value, onChange },
                                        meta: { touched, error }
                                    }) => (
                                        <TextField
                                            label="Last name"
                                            type="text"
                                            {...{
                                                error: Boolean(
                                                    touched && error
                                                ),
                                                value,
                                                onChange
                                            }}
                                            helperText={touched && error}
                                        />
                                    )}
                                />
                            </FormControl>
                            <Button variant="contained" type="submit">
                                Sign Up
                            </Button>
                            <MuiLink component={Link} to="/">
                                I already have an account
                            </MuiLink>
                        </Stack>
                    </Box>
                )}
                validate={validateRegistration}
            />
        </Paper>
    );
};
