import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EVENT_PARTICIPANTS, PARTICIPANTS_SUBSCRIPTION } from "../queries";
import { Card, Col, Row } from "antd";

function Participants() {
    const { id } = useParams();

    const { called, loading, error, data, subscribeToMore } = useQuery(
        GET_EVENT_PARTICIPANTS,
        {
            variables: {
                id,
                event_id: id,
            },
        }
    );

    useEffect(() => {
        if (!loading && called) {
            subscribeToMore({
                document: PARTICIPANTS_SUBSCRIPTION,
                variables: { event_id: id },
                updateQuery: (prev, { subscriptionData }) => {
                    console.log("prev", prev);
                    console.log("subscriptionData", subscriptionData);

                    if (!subscriptionData.data) return prev;

                    const newParticipantItem =
                        subscriptionData.data.participantAdded;

                    return {
                        event: {
                            ...prev.participants,
                            participants: [
                                ...prev.event.participants,
                                newParticipantItem,
                            ],
                        },
                    };
                },
            });
        }
    }, [id, loading, called, subscribeToMore]);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const participants = [];

    for (let i = 0; i < data.event.participants.length; i++) {
        const username = data.event.participants[i].user.username;
        const email = data.event.participants[i].user.email;
        let obj = {
            username,
            email,
        };

        if (!participants.some((p) => p.username === username))
            participants.push(obj);
    }

    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                {participants.map((p) => {
                    return (
                        <Col span={8} key={p.username}>
                            <Card title={p.username} bordered={false}>
                                {p.email}
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
}

export default Participants;
