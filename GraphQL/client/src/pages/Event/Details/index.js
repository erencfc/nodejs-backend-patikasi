import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EVENT_DETAILS } from "../queries";
import { Divider, Typography } from "antd";

import styles from "../styles.module.css";

const { Title, Text } = Typography;

function Details() {
    const { id } = useParams();

    const { loading, error, data } = useQuery(GET_EVENT_DETAILS, {
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

    const event = data.event;

    const date =
        Intl.DateTimeFormat("en-US")
            .format(new Date(event.date + "T00:00:00"))
            .replaceAll("/", ".") + ` ${event.from} - ${event.to}`;

    return (
        <div>
            <div className={styles.title}>
                <Title level={2}>{event.title}</Title>
            </div>

            <hr />

            <div className={styles.desc}>
                <Text italic strong>
                    {event.desc}
                </Text>
            </div>

            <div className={styles.eventDate}>
                <Divider orientation="right" plain>
                    {date}
                </Divider>
            </div>
        </div>
    );
}

export default Details;
