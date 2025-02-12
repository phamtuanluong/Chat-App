import React from "react";
import { Button, Card } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { signInWithGoogle } from "../firebase";
import { Footer, Header } from "antd/es/layout/layout";

const Login = () => {
    return (
        <>
            <Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "white" }}>
                <h2 style={{ fontSize: "21px" }}>Chat App</h2>
            </Header>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Card style={{ width: 500, height: 200, textAlign: "center", background: "#14191E" }}>
                    <h2 style={{ color: "#fff" }}>Login to Chat</h2>
                    <Button type="primary" icon={<GoogleOutlined />} onClick={signInWithGoogle}>
                        Sign in with Google
                    </Button>
                </Card>
            </div>
            <Footer style={{
                padding: "10px 40px",
                background: "#001529",
                color: "#fff",
                textAlign: "center"
            }}>
                Copyright 2025 by PhamTuanLuong
            </Footer>
        </>

    );
};

export default Login;
