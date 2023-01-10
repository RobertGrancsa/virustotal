import { useState, useEffect } from "react";
import {Link, NavLink} from "react-router-dom";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import {Dialog} from "@headlessui/react";
import {useCookies} from "react-cookie";
import {Avatar} from "@mui/material";
import {Dropdown, Navbar} from "flowbite-react";

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Upload', href: '/upload' },
    { name: 'Files', href: '/files' },
    { name: 'Links', href: '/links' },
]

export default function NavbarComponent() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const [cookies, setCookie, removeCookie] = useCookies(['userToken']);

    let nav;

    if (cookies.userToken === undefined) {
        nav = [
            { name: 'Home', href: '/' },
            { name: 'Upload', href: '/upload' },
        ]
    } else {
        nav = navigation
    }

    const logout = () => {
        window.location.replace("/");
        removeCookie("userToken")
    }

    return (
        <div className="px-6 pt-6 lg:px-8">
            <div>
                <nav className="flex h-9 items-center justify-between" aria-label="Global">
                    <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
                        <Link to="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img className="h-12" src="logo.png" alt="" />
                        </Link>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-12">
                        {nav.map((item) => (
                            <NavLink
                                to={item.href}
                                style={({ isActive }) =>
                                    ({color: isActive ? '#000' : '#606466'})
                                }
                                className="font-semibold text-gray-900 hover:text-gray-900"
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </div>
                    { cookies.userToken === undefined && <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end">
                        <Link to="/signin"
                              className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                        >
                            Log in
                        </Link>
                    </div>}
                    { cookies.userToken !== undefined && <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end">
                        <Dropdown
                            arrowIcon={false}
                            inline={true}
                            label={<Avatar src="/img/face-2.jpg" alt={cookies.userToken.email.toUpperCase()} />}
                        >
                            <Dropdown.Header>
                            <span className="block text-sm">
                            </span>
                                <span className="block truncate text-sm font-medium">
                              {cookies.userToken.email}
                            </span>
                            </Dropdown.Header>
                            <Dropdown.Item>
                                Dashboard
                            </Dropdown.Item>
                            <Dropdown.Item>
                                Settings
                            </Dropdown.Item>
                            <Dropdown.Item>
                                Earnings
                            </Dropdown.Item>
                            <Dropdown.Divider/>
                            <Dropdown.Item onClick={logout}>
                                Sign out
                            </Dropdown.Item>
                        </Dropdown>
                    </div>}
                </nav>
                <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <Dialog.Panel focus="true" className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
                        <div className="flex h-9 items-center justify-between">
                            <div className="flex">
                                <a href="#" className="-m-1.5 p-1.5">
                                    <span className="sr-only">Your Company</span>
                                    <img
                                        className="h-8"
                                        src="src/logo.png"
                                        alt=""
                                    />
                                </a>
                            </div>
                            <div className="flex">
                                <button
                                    type="button"
                                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <NavLink
                                            to={item.href}
                                            style={({ isActive }) =>
                                                ({color: isActive ? '#000' : '#606466'})
                                            }
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                                        >
                                            {item.name}
                                        </NavLink>
                                    ))}
                                </div>

                                {cookies.userToken === undefined && <div className="py-6">
                                    <Link to="/signin"
                                          onClick={() => setMobileMenuOpen(false)}
                                          className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                                    >
                                        Log in
                                    </Link>
                                </div>}

                                {cookies.userToken !== undefined && <div className="space-y-2 py-6">
                                    <div className="">
                                        <p to="/" onClick={logout}

                                           className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-700 hover:bg-gray-400/10"
                                        >
                                            {cookies.userToken.email}
                                        </p>
                                    </div>
                                    <div className="-my-6 divide-y divide-gray-500/10">
                                        <p to="/" onClick={logout}

                                           className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-700 hover:bg-gray-400/10"
                                        >
                                        </p>
                                    </div>
                                    <div className="-my-6 divide-y divide-gray-500/10">
                                        <Link to="/" onClick={logout}

                                              className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                                        >
                                            Log out
                                        </Link>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </div>
        </div>
    )

//     return (
//         <Navbar
//             fluid={true}
//             rounded={true}
//         >
//             <Navbar.Brand href="/">
//                     <img
//                         src="https://flowbite.com/docs/images/logo.svg"
//                         className="mr-3 h-6 sm:h-9"
//                         alt="Flowbite Logo"
//                     />
//                     <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
//                       <Link to="/">VirusTotal</Link>
//                     </span>
//             </Navbar.Brand>
//             <div className="flex md:order-2">
//                 <Button>
//                     Get started
//                 </Button>
//                 <Navbar.Toggle />
//             </div>
//             <Navbar.Collapse>
//                 <NavLink
//                     to="/"
//                     style={({ isActive }) =>
//                         ({color: isActive ? '#000' : '#606466'})
//                     }
//                 >
//                     Home
//                 </NavLink>
//                 <NavLink
//                     to="links"
//                     style={({ isActive }) =>
//                         ({color: isActive ? '#000' : '#606466'})
//                     }
//                 >
//                     Links
//                 </NavLink>
//                 <NavLink
//                     to="files"
//                     style={({ isActive }) =>
//                         ({color: isActive ? '#000' : '#606466'})
//                     }
//                 >
//                     Files
//                 </NavLink>
//             </Navbar.Collapse>
//         </Navbar>
// );
}