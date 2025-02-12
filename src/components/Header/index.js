import { logOut } from "../../firebase";
import { Button, Layout } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
const { Header } = Layout;
const Headers = () => {
    return (
        <Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "white" }}>
            <h2>Chat App</h2>
            <Button type="primary" icon={<LogoutOutlined />} onClick={logOut}>Logout</Button>
        </Header>
    );
};

export default Headers;
