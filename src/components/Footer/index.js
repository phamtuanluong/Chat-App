import { Layout, Button, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { auth, listenMessages, sendMessage } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const { Footer } = Layout;

const Footers = () => {
    const [user, setUser] = useState(null);
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Kiểm tra trạng thái đăng nhập
        const logins = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        // Lắng nghe tin nhắn từ Firestore
        const messages = listenMessages(setMessages);

        return () => {
            logins();
            messages();
        };
    }, []);
    
    return (
        <Footer style={{ display: "flex", alignItems: "center", padding: "10px" }}>
            <Input
                placeholder="Type a message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onPressEnter={() => {
                    sendMessage(text, user);
                    setText("");
                }}
            />
            <Button type="primary" icon={<SendOutlined />} onClick={() => {
                sendMessage(text, user);
                setText("");
            }} />
        </Footer>
    );
};

export default Footers;
