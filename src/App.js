import './App.css';
import {BrowserRouter, Link, Outlet, Route, Routes, useLocation} from "react-router-dom";
import HomeRoute from "./routes/home.route";
import NavbarComponent from "./components/navbar.component";
import FooterComponent from "./components/footer.component";
import SignInRoute from "./routes/signIn.route";
import SignUpRoute from "./routes/signup.route";
import LinksRoute from "./routes/links.route";
import UploadRoute from "./routes/upload.route";
import FilesRoute from "./routes/files.route";
import FileDisplayRoute from "./routes/filedisplay.route";
import LinkDisplayRoute from "./routes/urldisplay.route";
import {
    TransitionGroup,
    CSSTransition, SwitchTransition
} from "react-transition-group";
import {useEffect, useState} from "react";

function App() {
    let location = useLocation();
    // const [loc, setLoc] = useState(10);

    // useEffect(() => {
    //     console.log(loc);
    //     setLoc(loc + 1);
    // })

    return (
      <div className="isolate bg-white dark:bg-gray-800 flex flex-col min-h-screen">
          <div className={"absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"}>
              <svg
                  className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
                  viewBox="0 0 1155 678"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
              >
                  <path
                      fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
                      fillOpacity=".3"
                      d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                  />
                  <defs>
                      <linearGradient
                          id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
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

          <NavbarComponent/>
                  <Routes className="">
                      <Route element={<AnimationLayout />}>
                          <Route path="/" element={<HomeRoute />} />
                          <Route path="/signin" element={<SignInRoute />} />
                          <Route path="/signup" element={<SignUpRoute />} />
                          <Route path="/upload" element={<UploadRoute />} />
                          <Route path="/files" element={<FilesRoute />} />
                          <Route path="/files/:digest" element={<FileDisplayRoute />} />
                          <Route path="/links" element={<LinksRoute />} />
                          <Route path="/links/:addr" element={<LinkDisplayRoute />} />
                          <Route path="*" element={<Func404 />} />
                      </Route>
                  </Routes>
          <FooterComponent/>
      </div>
    );
}

function Func404() {
    return(
        <section className="dark:bg-gray-900">
            <div className="py-8 px-4 min-h-full mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center min-h-full ">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600 dark:text-blue-500">404</h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Something's
                        missing.</p>
                    <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that
                        page. You'll find lots to explore on the home page. </p>
                    <Link to="/"
                       className="inline-flex text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-900 my-4">Back
                        to Homepage</Link>
                </div>
            </div>
        </section>
    )
}



const AnimationLayout = () => {
    const { pathname } = useLocation();
    // const nodeRef =

    return (
        <SwitchTransition>
            <CSSTransition
                key={pathname}
                // nodeRef={nodeRef}
                timeout={300}
                classNames="page"
                unmountOnExit
            >
                <Outlet />
            </CSSTransition>
        </SwitchTransition>
    );
};

export default App;
