import {useForm} from "react-hook-form";
import axios from "axios";
import {useCookies} from "react-cookie";
import {useState} from "react";
import {sha512} from "js-sha512";
import {useNavigate} from "react-router-dom";
import API_URL from "../constants";
import {Spinner} from "flowbite-react";


export default function UploadfileComponent() {
    const { register, handleSubmit, formState: { errors }  } = useForm();
    const [cookies, setCookie] = useCookies(["userToken"]);

    const [notification, setNotification] = useState({message: null, isError: null});
    const [selectedFile, setSelectedFile] = useState(null);
    let navigate = useNavigate();

    const handleFileInput = (e) => {
        console.log(e.target.files)
        setSelectedFile(e.target.files[0])
    }

    const onSubmit = (data) => {
        console.log(data);
        console.log(errors);

        if (errors.toString().length === 0) {
            setNotification({
                message: errors.toString(),
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
        let utf8Encode = new TextEncoder();

        let reader = new FileReader();
        reader.readAsText(selectedFile);
        // console.log(selectedFile.readAsBinaryString())

        reader.onload = function() {
            console.log(reader.result);

            const sendData = {
                fileName: data.fileName,
                userEmail: email,
                binData: Array.from(utf8Encode.encode(reader.result))
            }

            console.log(sendData)

            axios.post("http://" + API_URL + "/api/v1/add_file", sendData, { headers: {
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

                    setTimeout(function() {
                        let digest = sha512(sendData.binData).toUpperCase();
                        navigate("/files/" + digest);
                    }, 5000);
                })
                .catch((error) => {
                    console.log(error);
                    setNotification({
                        message: error.message,
                        isError: true,
                    })
                })
        };


    };

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="shadow sm:overflow-hidden sm:rounded-md mb-4">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-3 sm:col-span-1">
                            <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <input
                                    type="text"
                                    name="company-website"
                                    id="company-website"
                                    className="block w-full flex-1 rounded-l-md rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="File description"
                                    {...register("fileName", { required: true })}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">File upload</label>
                        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                            <div className="space-y-1 text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto w-14 h-14">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>

                                <div className="flex text-sm text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                        <span>Upload a file</span>
                                        <input onChange={handleFileInput} id="file-upload" name="file-upload" type="file" className="sr-only" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">{selectedFile === null ? "Any EXE, binary file up to 10MB" : "Uploading " + selectedFile.name}</p>
                            </div>
                        </div>
                    </div>
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
                <Spinner className="ml-8" aria-label="Default status example" />
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
    )
}