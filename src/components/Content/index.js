import React, { useState, useEffect } from "react";
import { auth, listenMessages, sendMessage } from "../../firebase";
import { Layout, List, Avatar, Typography, Button, Input } from "antd";
import { onAuthStateChanged } from "firebase/auth";
import dayjs from "dayjs";
import { SendOutlined } from "@ant-design/icons";


const { Content } = Layout;
const { Text } = Typography;

const Contents = () => {
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");

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
        <Content style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px", overflowY: "auto" }}>
            <List
                dataSource={messages}
                renderItem={(msg) => (
                    <List.Item key={msg.id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Avatar>{msg.userName.charAt(0)}</Avatar>
                        <div>
                            <Text strong>{msg.userName}</Text>
                            <Text type="secondary" style={{ marginLeft: "10px", fontSize: "12px" }}>
                                {dayjs(msg.createdAt?.toDate()).format("HH:mm")}
                            </Text>
                            <p>{msg.text}</p>
                        </div>
                    </List.Item>
                )}
            />
            <Input
                placeholder="Type a message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onPressEnter={() => {
                    sendMessage(text, user);
                    setText("");
                }}
                style={{
                    position: "absolute",
                    bottom: "60px",
                    width: "1150px"
                }}
            />
            <Button type="primary" icon={<SendOutlined />} style={{
                position: "absolute",
                bottom: "60px",
                left: "1180px",
                width: "40px"
            }} onClick={() => {
                sendMessage(text, user);
                setText("");
            }} />
        </Content>
    );
};

export default Contents;
