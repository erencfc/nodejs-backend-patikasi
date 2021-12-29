import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Divider, Typography } from "antd";

import { GET_EVENT_LOCATION } from "../queries";
import styles from "../styles.module.css";

const { Title, Text } = Typography;

function Location() {
    const { id } = useParams();

    const { loading, error, data } = useQuery(GET_EVENT_LOCATION, {
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

    const location = data.event.location;
    console.log(location);

    return (
        <div className={styles.title}>
            <div className={styles.title}>
                <Title level={2}>{location.name}</Title>
            </div>

            <hr />

            <div className={styles.desc}>
                <Text strong>{location.desc}</Text>
            </div>

            <div className={styles.eventDate}>
                <Divider orientation="right" plain>
                    {`lat: ${location.lat} lng: ${location.lng}`}
                </Divider>
            </div>
        </div>
    );
}

export default Location;
