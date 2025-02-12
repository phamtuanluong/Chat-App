import React, { useState, useEffect, useRef } from "react";
import { auth, listenMessages } from "../../firebase";
import { Layout, List, Avatar, Typography } from "antd";
import { onAuthStateChanged } from "firebase/auth";
import dayjs from "dayjs";

const { Content } = Layout;
const { Text } = Typography;

const Contents = () => {
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null); // 🔹 Ref để cuộn xuống cuối danh sách

    useEffect(() => {
        // Kiểm tra trạng thái đăng nhập
        const logins = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        // Lắng nghe tin nhắn từ Firestore
        const messagesListener = listenMessages(setMessages);

        return () => {
            logins();
            messagesListener();
        };
    }, []);

    useEffect(() => {
        // 🔹 Cuộn xuống cuối danh sách khi có tin nhắn mới
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

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
            <div ref={messagesEndRef} /> {/* 🔹 Thẻ ẩn giúp cuộn xuống */}
        </Content>
    );
};

export default Contents;
