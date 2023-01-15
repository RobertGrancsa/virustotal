import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import { PaperClipIcon } from '@heroicons/react/20/solid'
import fileDownload from "js-file-download";
import API_URL from "../constants";
import {Toast} from "flowbite-react";
import {Button} from "@material-tailwind/react";
import {useCookies} from "react-cookie";

function getDateFormat(time) {
    const date = new Date(time);

    return date.getDay() + " " + date.toLocaleString('en-US', { month: 'long' }) + " " + date.getFullYear();
}

export default function FileDisplayRoute() {
    const params = useParams();
    const [file, setFile] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['userToken']);
    const navigate = useNavigate();

    useEffect(() => {
        if (file === null) {
            axios.get("http://" + API_URL + "/api/v1/file_info?fileSHA512Digest=" + params.digest)
                .then(res => {
                    console.log(res.data)
                    setFile(res.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    })

    const deleteElem = () => {
        console.log("Deleting");
        const deleteFile = {
            userEmail: cookies.userToken.email,
            fileSHA512Digest: file.digest
        }

        axios.post("http://" + API_URL + "/api/v1/delete_file", deleteFile, {headers: {
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

    const download = () => {
        let fileString = new TextDecoder().decode(Uint8Array.from(file.binData).buffer);
        fileDownload(fileString, file.fileName);
    }

    const getDisplay = () => {
        if (file === null) {
            return <div className="overflow-hidden bg-white shadow sm:rounded-lg px-10">
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
            <div className="overflow-hidden bg-white dark:bg-gray-700 shadow sm:rounded-lg
            ">
                <div className="px-4 py-5 sm:px-6 grid grid-cols-5">
                    <dt className="">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">File Information</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-300">Details about the uploaded file.</p>
                    </dt>
                    { cookies.userToken !== undefined && <dd className="col-start-5 col-end-5">
                        <div className="rounded-md" onClick={deleteElem}>
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
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Filename</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2 sm:mt-0">{file.fileName}</dd>
                        </div>
                        <div className="bg-white dark:bg-gray-800/60 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Uploaded by</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2 sm:mt-0">{file.userId}</dd>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800/30 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Date added</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2 sm:mt-0">{getDateFormat(file.dateAdded)}</dd>
                        </div>
                        <div className="bg-white dark:bg-gray-800/60 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Security level</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2 sm:mt-0">{file.securityLevel}</dd>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800/30 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Verdict</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2 sm:mt-0">{file.securityLevel.valueOf() < 5 ? "Site is safe to access" : "Beware when opening this site"}</dd>
                        </div>
                        <div className="bg-white dark:bg-gray-800/60 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Verdict</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2 sm:mt-0">
                                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-500 rounded-md border border-gray-200 dark:border-gray-500">
                                    <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                        <div className="flex w-0 flex-1 items-center">
                                            <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                            <span className="ml-2 w-0 flex-1 truncate">{file.fileName}</span>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <button onClick={download} className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                                                Download
                                            </button>
                                        </div>
                                    </li>
                                </ul>
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