import {Card} from "@mui/material";
import LinkComponent from "../components/link.component";
import {useCookies} from "react-cookie";
import {Fragment, useEffect, useState} from "react";
import axios from "axios";
import FileComponent from "../components/file.component";
import API_URL from "../constants";
import {Toast} from "flowbite-react";


const name = [
    {
        userId: "robiku1975@gmail.com",
        addr: "ceva.com",
        securityLevel: 5
    },
    {
        userId: "robiku1975@gmail.com",
        addr: "random.com",
        securityLevel: 3
    },
    {
        userId: "robiku1975@gmail.com",
        addr: "ceva.com",
        securityLevel: 5
    },
    {
        userId: "robiku1975@gmail.com",
        addr: "random.com",
        securityLevel: 3
    },

]

export default function FilesRoute() {

    const [cookies, setCookie, removeCookie] = useCookies(['userToken']);

    const [files, setFiles] = useState(null);

    const [notify, setNotify] = useState({fileName: null});

    useEffect(() => {
        if (files === null) {
            axios.get("http://" + API_URL + "/api/v1/user_files?userEmail=" + cookies.userToken.email)
                .then(res => {
                    console.log(res.data);
                    setFiles(res.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    })

    const removeItem = (item) => {
        let i = 0;
        let list = files.filter(function(ele){
            i++;
            return ele !== item;
        });

        console.log(i);

        setFiles(list);

        setTimeout(() => {
            if (notify.fileName === true) {
                notify.fileName = null;

                list.push(item);
                setFiles(list);
                return;
            }

            const file = {
                userEmail: cookies.userToken.email,
                fileSHA512Digest: item.digest
            }

            axios.post("http://" + API_URL + "/api/v1/delete_file", file, {headers: {
                    'AccessToken' : cookies.userToken.token,
                }})
                .then(res => {
                    console.log(res.data);
                    notify.fileName = null;
                })
                .catch((error) => {
                    console.log(error);
                    notify.fileName = null;
                })
        }, 5000);
    }

    const getLinks = () => {
        if (files === null) {
            return <div role="status" className="max-w-sm animate-pulse my-10">
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
        }

        return files.map(elem => {
            return <FileComponent key={elem.toString()} element={elem} removeFunc={removeItem} notification={notify}/>
        })
    }

    return (
        <>
        <Fragment>
            <div className="flex items-center justify-center">
                <div className="rounded-md bg-white shadow lg:px-10 md:px-4 pt-5 lg:w-2/3 mt-10 pb-10 md:w-1 dark:bg-gray-800">
                    <h2 className="px-5 mt-6 text-left text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-200 ">
                        List of files
                    </h2>
                    { getLinks() }
                </div>
            </div>
            <div id="toast-undo"
                 className={"flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" + notify.fileName === null ? " ": " hidden"}
                 role="alert">
                <div className="text-sm font-normal">
                    Conversation archived.
                </div>
                <div className="flex items-center ml-auto space-x-2">
                    <a className="text-sm font-medium text-blue-600 p-1.5 hover:bg-blue-100 rounded-lg dark:text-blue-500 dark:hover:bg-gray-700"
                       href="#">Undo</a>
                    <button type="button"
                            className="bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                            data-dismiss-target="#toast-undo" aria-label="Close">
                        <span className="sr-only">Close</span>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div className={"flex lg:justify-end" + notify.fileName === null ? " ": " hidden"}>
            <Toast>
                <div className="text-sm font-normal">
                    Conversation archived.
                </div>
                <div className="ml-auto flex items-center space-x-2">
                    <button
                        className="rounded-lg p-1.5 text-sm font-medium text-blue-600 hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-700"
                    >
                        Undo
                    </button>
                    <Toast.Toggle />
                </div>
            </Toast>
            </div>
        </Fragment>
        </>
    )
}