"use client";
import { useState, useEffect } from "react";
import Router from "next/router";
import Loader from ".";
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const LoadingWidget = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleRouteChangeStart = () => setLoading(true);
        const handleRouteChangeComplete = () => setLoading(false);

        Router.events.on("routeChangeStart", handleRouteChangeStart);
        Router.events.on("routeChangeComplete", handleRouteChangeComplete);

        // Axios request interceptor
        const requestInterceptor = axios.interceptors.request.use(
            (config: InternalAxiosRequestConfig<any>) => {
                setLoading(true);
                return config;
            },
            (error: AxiosError) => {
                setLoading(false);
                return Promise.reject(error);
            }
        );

        // Axios response interceptor
        const responseInterceptor = axios.interceptors.response.use(
            (response: AxiosResponse) => {
                setLoading(false);
                return response;
            },
            (error: AxiosError) => {
                setLoading(false);
                return Promise.reject(error);
            }
        );
        return () => {
            Router.events.off("routeChangeStart", handleRouteChangeStart);
            Router.events.off("routeChangeComplete", handleRouteChangeComplete);

            // Remove Axios interceptors when component unmounts
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, []);

    return loading ? <Loader /> : null;
};

export default LoadingWidget;