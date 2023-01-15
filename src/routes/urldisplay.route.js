import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Button} from "@material-tailwind/react";
import API_URL from "../constants";
import {useCookies} from "react-cookie";

function getDateFormat(time) {
    const date = new Date(time);

    return date.getDay() + " " + date.toLocaleString('en-US', { month: 'long' }) + " " + date.getFullYear();
}

export default function LinkDisplayRoute() {
    const params = useParams();
    const [link, setLink] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['userToken']);
    const navigate = useNavigate();


    useEffect(() => {
        if (link === null) {
            axios.get("http://" + API_URL + "/api/v1/url_info?urlAddress=" + params.addr)
                .then(res => {
                    console.log(res.data)
                    setLink(res.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    })

    const deleteElem = () => {
        const deleteLink = {
            userEmail: cookies.userToken.email,
            urlAddress: link.addr
        }

        axios.post("http://" + API_URL + "/api/v1/delete_url", deleteLink, {headers: {
                'AccessToken' : cookies.userToken.token,
            }})
            .then(res => {
                console.log(res.data);
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const getDisplay = () => {
        if (link === null) {
            return <div className="overflow-hidden bg-white dark:bg-gray-700 shadow sm:rounded-lg px-10">
                <div role="status" className="max-w-sm animate-pulse my-10">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 mt-6"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 mt-6"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        }

        return <>
            <div className="overflow-hidden bg-white shadow sm:rounded-lg dark:bg-gray-700">
                <div className="px-4 py-5 sm:px-6 grid grid-cols-5">
                    <dt className="">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">Link Information</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-300">Details about the uploaded link.</p>
                    </dt>
                    {cookies.userToken !== undefined && <dd className="col-start-5 col-end-5" onClick={deleteElem}>
                        <div className="rounded-md ">
                            <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                <div className="flex w-0 flex-1 items-center">
                                </div>
                                <a className="ml-4 flex-shrink-0">
                                    <Button type="button"
                                            className="font-medium text-gray-50 hover:text-gray-200 w-full bg-red-500">
                                        Delete
                                    </Button>
                                </a>
                            </li>
                        </div>
                    </dd>}
                </div>
                <div className="border-t border-gray-200 dark:border-gray-600">
                    <dl>
                        <div className="bg-gray-50 dark:bg-gray-800/30 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Address</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2 sm:mt-0">{link.addr}</dd>
                        </div>
                        <div className="bg-white dark:bg-gray-800/60 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Uploaded by</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2 sm:mt-0">{link.userId}</dd>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800/30 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Date added</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2 sm:mt-0">{getDateFormat(link.dateAdded)}</dd>
                        </div>
                        <div className="bg-white dark:bg-gray-800/60 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Security level</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2 sm:mt-0">{link.securityLevel}</dd>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800/30 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Attachments</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2 sm:mt-0">
                                <div role="list" className="rounded-md">
                                    <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                        <div className="flex w-0 flex-1 items-center">
                                        </div>
                                        <a href={"//" + link.addr} className="ml-4 flex-shrink-0">
                                            <Button type="button" className="font-medium text-indigo-100 hover:text-indigo-900 w-full">
                                                Open link
                                            </Button>
                                        </a>
                                    </li>
                                </div>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </>
    }

    return (
        <>
            <div className="flex items-center justify-center">
                <div className="lg:px-10 md:px-4 pt-5 lg:w-2/3 mt-10 pb-10 md:w-1">
                    {getDisplay()}
                </div>
            </div>

        </>
    )
}