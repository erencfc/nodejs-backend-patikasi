import { Routes, Route, Link, useParams, useLocation } from "react-router-dom";
import { Col, Menu, Row } from "antd";

import styles from "./styles.module.css";

// Pages
import Details from "./Details";
import User from "./User";
import Participants from "./Participants";
import Location from "./Location";

function Event() {
    const { id } = useParams();
    const eventPage = `/event/${id}`;

    const location = useLocation();

    return (
        <div className={styles.container}>
            <Row justify="center">
                <Col span={14}>
                    <Menu
                        mode="horizontal"
                        selectedKeys={location.pathname}
                        className={styles.headerMenu}
                    >
                        <Menu.Item key="home" className={styles.menuItem}>
                            <Link to="/">Home</Link>
                        </Menu.Item>

                        <Menu.Item
                            key={eventPage}
                            aria-selected
                            className={styles.menuItem}
                        >
                            <Link to={eventPage}>Details</Link>
                        </Menu.Item>

                        <Menu.Item
                            key={`${eventPage}/location`}
                            className={styles.menuItem}
                        >
                            <Link to={`${eventPage}/location`}>Location</Link>
                        </Menu.Item>

                        <Menu.Item
                            key={`${eventPage}/participants`}
                            className={styles.menuItem}
                        >
                            <Link to={`${eventPage}/participants`}>
                                Participants
                            </Link>
                        </Menu.Item>

                        <Menu.Item
                            key={`${eventPage}/user`}
                            className={styles.menuItem}
                        >
                            <Link to={`${eventPage}/user`}>Owner</Link>
                        </Menu.Item>
                    </Menu>

                    <div className={styles.content}>
                        <Routes>
                            <Route path="/" element={<Details />} />
                            <Route path="location" element={<Location />} />
                            <Route
                                path="participants"
                                element={<Participants />}
                            />
                            <Route path="user" element={<User />} />
                        </Routes>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Event;
