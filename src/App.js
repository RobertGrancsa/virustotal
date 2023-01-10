import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomeRoute from "./routes/home.route";
import NavbarComponent from "./components/navbar.component";
import FooterComponent from "./components/footer.component";
import SignInRoute from "./routes/signIn.route";
import {useCookies} from "react-cookie";
import SignUpRoute from "./routes/signup.route";
import LinksRoute from "./routes/links.route";
import UploadRoute from "./routes/upload.route";
import FilesRoute from "./routes/files.route";
import FileDisplayRoute from "./routes/filedisplay.route";
import LinkDisplayRoute from "./routes/urldisplay.route";

function App() {
    const [cookies, setCookie, removeCookie] = useCookies(['userToken']);

    return (
      <div className="isolate bg-white">
          <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
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
          <BrowserRouter>
              <NavbarComponent/>
              <Routes>
                  <Route path="/" element={<HomeRoute />} />
                  <Route path="/signin" element={<SignInRoute />} />
                  <Route path="/signup" element={<SignUpRoute />} />
                  <Route path="/upload" element={<UploadRoute />} />
                  <Route path="/files" element={<FilesRoute />} />
                  <Route path="/files/:digest" element={<FileDisplayRoute />} />
                  <Route path="/links" element={<LinksRoute />} />
                  <Route path="/links/:addr" element={<LinkDisplayRoute />} />
              </Routes>
          <FooterComponent/>
          </BrowserRouter>
      </div>
    );
}

export default App;
