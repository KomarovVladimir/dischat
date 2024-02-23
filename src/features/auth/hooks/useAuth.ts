import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { api } from "app/services/api";
import { useLocalStorage } from "common/hooks";
import { RootState } from "app/store";

import {
    useLoginRequestMutation,
    useLogoutRequestMutation,
    useRegistrationRequestMutation
} from "../api/authApi";
import { AuthUser, UserSignInData, UserSignUpData } from "../types";
import { logout, setUser } from "../slice";
import { USER_ITEM } from "../constants";

//TODO: Use async
//TODO: ADD A LISTENER FOR THE LOCAL STORAGE
export const useAuth = () => {
    const dispatch = useDispatch();
    const user = useSelector<RootState, AuthUser | undefined>(
        (state) => state.auth.user
    );
    const { getItem } = useLocalStorage(USER_ITEM);
    const navigate = useNavigate();
    const [loginRequest, loginResult] = useLoginRequestMutation();
    const [registrationRequest] = useRegistrationRequestMutation();
    const [logoutRequest] = useLogoutRequestMutation();

    useEffect(() => {
        const user = getItem();

        if (user) {
            dispatch(setUser(user));
        }
    }, []);

    const handleLogin = (data: UserSignInData) => {
        loginRequest(data)
            .unwrap()
            .then((data) => {
                dispatch(setUser(data));
            })
            .catch((error) => console.error("An error occurred", error));
    };

    const handleLogout = () => {
        logoutRequest()
            .unwrap()
            .then(() => {
                dispatch(api.util.resetApiState());
                dispatch(logout());
            })
            .catch((error) => console.error("An error occurred", error));
    };

    const handleRegister = (data: UserSignUpData) => {
        registrationRequest(data)
            .then(() => {
                navigate("/");
            })
            .catch((error) => console.error("An error occurred", error));
    };

    return { user, handleLogin, loginResult, handleRegister, handleLogout };
};
