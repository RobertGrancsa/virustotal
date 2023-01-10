import {useForm} from "react-hook-form";
import {useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";


export default function UploadlinkComponent() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ formData, setFormData ] = useState({url: ""});
    const [cookies, setCookie] = useCookies(["userToken"]);

    const [notification, setNotification] = useState({message: null, isError: null});



    const onChangeUrl = (url) => {
        let link = url.target.value
        console.log(link)
        if (link.includes("https://")) {
            link = link.substring(8)
        }

        if (link.includes("http://")) {
            console.log("has http")
            link = link.substring(7)
        }

        setFormData({url: link})
    }

    const onSubmit = (data) => {
        console.log(formData);

        if (formData.url.length === 0) {
            setNotification({
                message: "Link is empty",
                isError: true,
            })

            return;
        }
        let email = "anonymous@anon.com"
        let token = "901987D54C45B0C0E4AE097B842644563A30D5868E7E2EDEEF1B57E6F03EA755827F07A9567801D01549AF5C87A2A3996F523515836E3F33846B94709E1E2509"

        if (cookies.userToken !== undefined) {
            email = cookies.userToken.email
            token = cookies.userToken.token
        }

        const sendData = {
            urlAddress: formData.url,
            userEmail: email
        }

        console.log(sendData)

        axios.post("http://192.168.1.151:8080/api/v1/add_url", sendData, { headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'AccessToken' : token,
            }})
            .then(res => {
                console.log(res.data);
                setNotification({
                    message: res.data,
                    isError: false,
                })
            })
            .catch((error) => {
                console.log(error);
                setNotification({
                    message: error.message,
                    isError: true,
                })
            })
    };

    return(
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="shadow sm:overflow-hidden sm:rounded-md mb-4">

                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-3 sm:col-span-2">
                            <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                Website
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                          https://
                        </span>
                                <input
                                    type="text"
                                    name="company-website"
                                    id="company-website"
                                    className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="www.example.com"
                                    value={formData.url}
                                    onChange={onChangeUrl}
                                />
                            </div>
                        </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                        Upload a website that we are going to scan for viruses. URLs are hyperlinked.
                    </p>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Send
                    </button>
                </div>
            </div>
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
        </form>
        </>
    )
}