import { Fragment } from 'react'
import {
    CheckCircleIcon,
    ExclamationCircleIcon,
    CalendarIcon,
    BugAntIcon,
    ChevronDownIcon,
    CurrencyDollarIcon,
    LinkIcon,
    MapPinIcon,
    PencilIcon,
    ArchiveBoxXMarkIcon,
} from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import axios from "axios";
import {useCookies} from "react-cookie";
import {Link} from "react-router-dom";
import API_URL from "../constants";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function getDateFormat(time) {
    const date = new Date(time);

    return date.getDay() + " " + date.toLocaleString('en-US', { month: 'long' }) + " " + date.getFullYear();
}

export default function FileComponent({element, removeFunc}) {
    const [cookies, setCookie] = useCookies(["userToken"]);

    const deleteItem = () => {
        const file = {
            userEmail: cookies.userToken.email,
            fileSHA512Digest: element.digest
        }

        axios.post("http://" + API_URL + "/api/v1/delete_file", file, {headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'AccessToken' : cookies.userToken.token,
            }})
            .then(res => {
                console.log(res.data);
                removeFunc(element)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="lg:flex lg:items-center lg:justify-between m-5">
            <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    {element.fileName}
                </h2>
                <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                        <BugAntIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        Danger level: {element.securityLevel}
                    </div>
                    {element.securityLevel.valueOf() < 5 ? <div className="mt-2 flex items-center text-sm text-gray-500">
                        <CheckCircleIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        Site is safe to access
                    </div> : <div className="mt-2 flex items-center text-sm text-gray-500">
                        <ExclamationCircleIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        Beware when opening this site
                    </div>}
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                        <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        Added on {getDateFormat(element.dateAdded)}
                    </div>
                </div>
            </div>
            <div className="mt-5 flex lg:mt-0 lg:ml-4">
        <span className="hidden sm:block">
          <button
              type="button"
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
            Edit
          </button>
        </span>

                <span className="ml-3 hidden sm:block">
          <Link
              to={"/files/" + element.digest}
              type="button"
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <LinkIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
            View
          </Link>
        </span>

                <span className="sm:ml-3">
          <button

              onClick={deleteItem}
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-red-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-offset-2"
          >
            <ArchiveBoxXMarkIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Delete
          </button>
        </span>

                {/* Dropdown */}
                <Menu as="div" className="relative ml-3 sm:hidden">
                    <Menu.Button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        More
                        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                    </Menu.Button>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="#"
                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                    >
                                        Edit
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        to={"/files/" + element.digest}
                                        onClick={deleteItem}
                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                    >
                                        View
                                    </Link>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    )
}
