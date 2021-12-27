import { Typography, Form, Input, Button, message, List } from "antd";
import { Route, Routes } from "react-router-dom";
import styles from "./styles.module.css";
import "antd/dist/antd.css";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EVENTS, CREATE_EVENT } from "./queries";

import Event from "pages/Event";

const { Title } = Typography;

function App() {
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

    console.log(data);

    return (
        <div className={styles.container}>
            <Routes>
                <Route path="/event/:id" component={Event} />
            </Routes>
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
            <hr />

            <div
                id="scrollableDiv"
                style={{
                    height: 400,
                    overflow: "auto",
                    padding: "0 16px",
                    border: "1px solid rgba(140, 140, 140, 0.35)",
                }}
            >
                <List
                    dataSource={data.events}
                    renderItem={(item) => (
                        <List.Item key={item.id}>
                            <List.Item.Meta
                                title={item.title}
                                description={item.desc}
                            />
                            <div>{item.date}</div>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
}

export default App;
