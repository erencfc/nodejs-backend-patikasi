import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EVENT_PARTICIPANTS } from "../queries";
import { Card, Col, Row } from "antd";

function Participants() {
    const { id } = useParams();

    const { loading, error, data } = useQuery(GET_EVENT_PARTICIPANTS, {
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
