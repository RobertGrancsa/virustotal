import {Card} from "@mui/material";
import LinkComponent from "../components/link.component";
import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";
import axios from "axios";
import API_URL from "../constants";


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

export default function LinksRoute() {

    const [cookies, setCookie, removeCookie] = useCookies(['userToken']);

    const [links, setLinks] = useState(null)

    useEffect(() => {
        if (links === null) {
            axios.get("http://" + API_URL + "/api/v1/user_urls?userEmail=" + cookies.userToken.email)
                .then(res => {
                    console.log(res.data);
                    setLinks(res.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    })

    const removeItem = (item) => {
        let list = links.filter(function(ele){
            return ele !== item;
        });
        setLinks(list);
    }

    const getLinks = () => {
        if (links === null) {
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

        return links.map(elem => {
            return <LinkComponent key={elem.toString()} element={elem} removeFunc={removeItem}/>
        })
    }

    return (
        <div className="flex items-center justify-center">
            <Card className="lg:px-10 md:px-4 pt-5 lg:w-2/3 mt-10 pb-10 md:w-1">
                <h2 className="px-5 mt-6 text-left text-4xl font-bold tracking-tight text-gray-900">
                    List of urls
                </h2>
                { getLinks() }
            </Card>
        </div>
    )
}