import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import UploadfileComponent from "../components/uploadfile.component";
import UploadlinkComponent from "../components/uploadlink.component";

const data = [
    {
        label: "File",
        value: "File",
    },
    {
        label: "Url",
        value: "Url",
    },

    {
        label: "Search",
        value: "Search",
    },
];

export default function UploadRoute() {


    return (
        <div className="flex  items-center justify-center lg:h-screen md:mt-10">
            <div className="bg-white dark:bg-gray-800 rounded-md shadow md:mt-8 w-3/4 p-8 transition-all duration-100 delay-75">
                <Tabs value="File" className="dark:bg-gray-800">
                    <TabsHeader className="dark:bg-gray-700">
                        {data.map(({ label, value }) => (
                            <Tab key={value} value={value} className=" dark:text-gray-400" color="#1F2937">
                                {label}
                            </Tab>
                        ))}
                    </TabsHeader>
                    <TabsBody className="dark:bg-gray-800" animate={{
                        mount: { x: 0 },
                        unmount: { y: 250 },
                    }}
                    >
                        <TabPanel key="File" value="File" className="dark:bg-gray-800">
                            <UploadfileComponent/>
                        </TabPanel>
                        <TabPanel key="Url" value="Url" className="dark:bg-gray-800">
                            <UploadlinkComponent/>
                        </TabPanel>
                        <TabPanel key="Search" value="Search" className="dark:bg-gray-800">
                            <UploadfileComponent/>
                        </TabPanel>
                    </TabsBody>
                </Tabs>
            </div>
        </div>


    );
}