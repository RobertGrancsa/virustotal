import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import {Card} from "@mui/material";
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
            <Card className="md:mt-8 w-3/4 p-8 transition-all duration-100 delay-75">
                <Tabs value="File">
                    <TabsHeader>
                        {data.map(({ label, value }) => (
                            <Tab key={value} value={value}>
                                {label}
                            </Tab>
                        ))}
                    </TabsHeader>
                    <TabsBody animate={{
                        mount: { x: 0 },
                        unmount: { y: 250 },
                    }}
                    >
                        <TabPanel key="File" value="File">
                            <UploadfileComponent/>
                        </TabPanel>
                        <TabPanel key="Url" value="Url">
                            <UploadlinkComponent/>
                        </TabPanel>
                        <TabPanel key="Search" value="Search">
                            <UploadfileComponent/>
                        </TabPanel>
                    </TabsBody>
                </Tabs>
            </Card>
        </div>


    );
}