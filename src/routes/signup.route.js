import { LockClosedIcon } from '@heroicons/react/20/solid'
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useCookies} from "react-cookie";
import {useState} from "react";
import API_URL from "../constants";

export default function SignUpRoute() {
    const { register, handleSubmit, formState: { errors }  } = useForm();
    const [cookies, setCookie] = useCookies(["userToken"]);

    const [notification, setNotification] = useState({message: null, isError: null});
    let navigate = useNavigate();

    const submitForm = (data) => {
        if (errors.toString().length !== 0) {
            console.log("Error" + errors)
        }

        console.log(data)

        axios.post("http://" + API_URL + "/api/v1/signup", data)
            .then(res => {
                console.log(res.data);

                const login = {
                    userEmail: data.userEmail,
                    password: data.password,
                }

                setNotification({
                    message: res.data,
                    isError: false,
                })

                console.log(login)

                axios.post("http://" + API_URL + "/api/v1/login", login, { headers: {
                        'Access-Control-Allow-Origin' : '*',
                        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
                    }})
                    .then(res =>  {
                        setCookie("userToken", {
                            token: res.data["AccessToken"],
                            email: data.userEmail
                        }, {
                            path: "/"
                        });

                        setTimeout(function() {
                            window.location.replace("/upload");
                        }, 500);
                    })
                    .catch((error) => {
                        console.log(error);
                        setNotification({
                            message: error.message,
                            isError: true
                        })
                    })
            })
            .catch((error) => {
                console.log(error);
                setNotification({
                    message: error.message,
                    isError: true
                })
            })
    }

    return (
        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 lg:mt-40 lg:mb-40 md:mt-4 md:mb-40">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <img
                            className="mx-auto h-16 w-auto"
                            src="logo.png"
                            alt="VirusTotal"
                        />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Create a new account
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Or{' '}
                            <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
                                sign in
                            </Link>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(data => submitForm(data))}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Email address"
                                    {...register("userEmail", {required: true, pattern: /^\S+@\S+$/i})}
                                />
                            </div>
                            <div>
                                <label htmlFor="username" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="username"
                                    autoComplete="username"
                                    required
                                    className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Username"
                                    {...register("username", {required: true, maxLength: 32})}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                    {...register("password", {required: true, maxLength: 32})}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link to="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                                Create account
                            </button>
                        </div>
                    </form>
                    { notification.isError === false && <div
                        className="flex p-4 mb-4 text-sm text-blue-700 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
                        role="alert">
                        <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor"
                             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                  clip-rule="evenodd"></path>
                        </svg>
                        <span className="sr-only">Info</span>
                        <div>
                            <span className="font-medium"></span> {notification.message}
                        </div>
                    </div> }
                    { notification.isError === true && <div
                        className="flex p-4 mb-4 text-sm text-red-700 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                        role="alert">
                        <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor"
                             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                  clip-rule="evenodd"></path>
                        </svg>
                        <span className="sr-only">Info</span>
                        <div>
                            <span className="font-medium">Error!</span> {notification.message}
                        </div>
                    </div> }
                </div>

                <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                    <svg
                        className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 -translate-y-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
                        viewBox="0 0 1155 678"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                            fillOpacity=".3"
                            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                        />
                        <defs>
                            <linearGradient
                                id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                                x1="1155.49"
                                x2="-78.208"
                                y1=".177"
                                y2="474.645"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#9089FC" />
                                <stop offset={1} stopColor="#FF80B5" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>
        </>
    )
}
