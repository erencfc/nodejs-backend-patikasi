import { Typography, Form, Input, Button, message, List, Card } from "antd";
import styles from "./styles.module.css";
import "antd/dist/antd.min.css";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EVENTS, CREATE_EVENT } from "./queries";
import { Link } from "react-router-dom";
import React from "react";

const { Title } = Typography;

function Home() {
    const [saveEvent] = useMutation(CREATE_EVENT);
    const { loading, error, data } = useQuery(GET_EVENTS);

    const handleSubmit = async (values) => {
        try {
            await Object.assign(values, {
                from: "08:00",
                to: "10:00",
                location_id: 2,
                user_id: 4,
            });

            await saveEvent({
                variables: {
                    data: values,
                },
            });
            message.success("Event saved!", 4);
        } catch (e) {
            console.log(e);
            message.error("Event not saved!", 10);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
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

            <div className={styles.form}>
                <Form
                    name="basic"
                    onFinish={handleSubmit}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Title:"
                        name="title"
                        className={styles.formItem}
                    >
                        <Input
                            required={true}
                            placeholder="Enter event title"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Description:"
                        name="desc"
                        className={styles.formItem}
                    >
                        <Input
                            required={true}
                            placeholder="Enter event description"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Event Date:"
                        name="date"
                        className={styles.formItem}
                    >
                        <Input
                            required={true}
                            placeholder="Enter date (yyyy-mm-dd)"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            htmlType="submit"
                            type="primary"
                            className={styles.formBtn}
                        >
                            Add Event
                        </Button>
                    </Form.Item>
                </Form>
            </div>

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
                                .format(new Date(item.date + "T00:00:00"))
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
