import { useEffect } from "react";
import { Typography, List, Card } from "antd";
import styles from "./styles.module.css";
import "antd/dist/antd.min.css";
import { useQuery } from "@apollo/client";
import { GET_EVENTS, EVENTS_SUBSCRIPTION } from "./queries";
import { Link } from "react-router-dom";
import React from "react";
import CreateEvent from "./CreateEvent";
import Loading from "components/Loading";

const { Title } = Typography;

function Home() {
    const { loading, error, data, subscribeToMore } = useQuery(GET_EVENTS);

    useEffect(() => {
        subscribeToMore({
            document: EVENTS_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;

                return {
                    events: [
                        subscriptionData.data.eventCreated,
                        ...prev.events,
                    ],
                };
            },
        });
    }, [subscribeToMore]);

    if (loading) {
        return <Loading />;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Title level={2}>Event Sync</Title>
            </div>
            <hr />

            <CreateEvent />

            <List
                className={styles.cardList}
                dataSource={data.events}
                renderItem={(item) => (
                    <List.Item key={item.id} className={styles.cardItem}>
                        <Card
                            // type="inner"
                            hoverable={true}
                            title={
                                <Link
                                    to={`/event/${item.id}`}
                                    style={{ color: "rgba(0, 0, 0, 0.85)" }}
                                >
                                    {item.title}
                                </Link>
                            }
                            extra={Intl.DateTimeFormat("en-US")
                                .format(new Date(item.date))
                                .replaceAll("/", ".")} // Format Date
                            className={styles.cardEvent}
                        >
                            <Link
                                to={`/event/${item.id}`}
                                style={{ color: "rgba(0, 0, 0, 0.85)" }}
                            >
                                {item.desc}
                            </Link>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
}

export default Home;
