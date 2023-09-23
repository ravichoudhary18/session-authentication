import { useEffect } from "react";
import axios from "axios";
const URL = import.meta.env.VITE_API_END_POINT;

const useAxiosPrivate = () => {

    const Token = localStorage.getItem("token");

    const axiosPrivate = axios.create({
        baseURL: URL,
        headers: {
            Authorization: `Bearer ${Token}`,
        },
    });

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers.Authorization) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            },

            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {

                if (error.response.status === 401) {
                    localStorage.clear()
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [Token, axiosPrivate]);

    return axiosPrivate;
};

export default useAxiosPrivate;