import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Typography } from "antd";

import { GET_EVENT_OWNER } from "../queries";
import styles from "../styles.module.css";

const { Title, Text } = Typography;

function User() {
    const { id } = useParams();

    const { loading, error, data } = useQuery(GET_EVENT_OWNER, {
        variables: {
            id,
        },
    });

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const user = data.event.user;

    console.log(user);

    return (
        <div>
            <Title level={2} className={styles.title}>
                Event Owner
            </Title>
            <div className={styles.desc}>
                <Text strong>
                    Username: {user.username}
                    <hr />
                    Email: {user.email}
                </Text>
            </div>
        </div>
    );
}

export default User;
