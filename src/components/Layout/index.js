import { Layout} from "antd";
import Headers from "../Header";
import Contents from "../Content";
import Footers from "../Footer";

const LayoutDefault = () => {
    return (
        <Layout style={{ height: "100vh" }}>
            <Headers />
            <Contents />
            <Footers />
        </Layout>
    );
};

export default LayoutDefault;
