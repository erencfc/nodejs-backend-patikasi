import { useMutation, useQuery } from "@apollo/client";
import { Button, Input, message, Form, Select } from "antd";
import { CREATE_EVENT, GET_LOCATIONS, GET_USERS } from "../queries";
import styles from "./styles.module.css";

function CreateEvent() {
    const [saveEvent, { loading }] = useMutation(CREATE_EVENT);

    const { loading: users_loading, data: users_data } = useQuery(GET_USERS);

    const { loading: locations_loading, data: locations_data } =
        useQuery(GET_LOCATIONS);

    const handleSubmit = async (values) => {
        try {
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

    return (
        <div className={styles.form}>
            <Form
                onFinish={handleSubmit}
                wrapperCol={{ span: 16 }}
                autoComplete="off"
            >
                <Form.Item name="title">
                    <Input
                        disabled={loading}
                        required={true}
                        placeholder="Title"
                    />
                </Form.Item>

                <Form.Item name="desc">
                    <Input.TextArea
                        disabled={loading}
                        required={true}
                        placeholder="Description"
                    />
                </Form.Item>

                <Form.Item name="date">
                    <Input disabled={loading} type={"date"} required={true} />
                </Form.Item>

                <Form.Item style={{ marginLeft: "48px" }}>
                    <Form.Item name="from" className={styles.timeInput}>
                        <Input disabled={loading} type={"time"} />
                    </Form.Item>
                    <Form.Item name="to" className={styles.timeInput}>
                        <Input disabled={loading} type={"time"} />
                    </Form.Item>
                </Form.Item>

                <Form.Item className={styles.select}>
                    <Form.Item name="user" className={styles.selectItem}>
                        <Select
                            disabled={users_loading || loading}
                            loading={users_loading || loading}
                            placeholder="User"
                            size="large"
                        >
                            {users_data &&
                                users_data.users.map((user) => (
                                    <Select.Option
                                        key={user.id}
                                        value={user.id}
                                    >
                                        {user.username}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="location" className={styles.selectItem}>
                        <Select
                            disabled={locations_loading || loading}
                            loading={locations_loading || loading}
                            placeholder="Location"
                            size="large"
                        >
                            {locations_data &&
                                locations_data.locations.map((location) => (
                                    <Select.Option
                                        key={location.id}
                                        value={location.id}
                                    >
                                        {location.name}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>
                </Form.Item>

                <Form.Item className={styles.btnItem}>
                    <Button
                        loading={loading}
                        htmlType="submit"
                        type="primary"
                        className={styles.formBtn}
                    >
                        Add Event
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default CreateEvent;
