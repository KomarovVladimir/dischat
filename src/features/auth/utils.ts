import { UserSignInData, UserSignUpData } from "./types";

export const validateLogin = ({ email, password }: UserSignInData) => {
    const errors = {} as Record<string, string>;

    if (!email) {
        errors.email = "Email is required";
    }

    if (!password) {
        errors.password = "Password is required";
    }

    return errors;
};

export const validateRegistration = ({
    firstName,
    lastName,
    email,
    password,
    confirmation
}: UserSignUpData) => {
    const errors = {} as Record<string, string>;

    if (!email) {
        errors.email = "Email is required";
    }

    if (!password) {
        errors.password = "Password is required";
    }

    if (!confirmation) {
        errors.confirm = "Please confirm your password";
    } else if (confirmation !== password) {
        errors.confirmation = "The password confirmation does not match";
    }

    if (!firstName) {
        errors.firstName = "Name is required";
    }

    if (!lastName) {
        errors.lastName = "Last name is required";
    }

    return errors;
};
