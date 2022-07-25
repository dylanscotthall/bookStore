import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Store } from "../store";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MessageBox from '../components/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

export default function CartScreen() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;
    return (
        <div>
            <Helmet>
                <title>Cart</title>
            </Helmet>
            <h1>Cart</h1>
            <Row>
                <Col md={8}>
                    {cartItems.length === 0 ? (
                        <MessageBox>
                            Cart is Empty, <Link to="/">Go Shopping</Link>
                        </MessageBox>
                    ) :
                        (
                            <ListGroup>
                                {cartItems.map((item) => (
                                    <ListGroup.Item key={item._id}>
                                        <Row className="align-items-center">
                                            <Col md={4}>
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="img-fluid rounded img-thumbnail"></img>
                                                {' '}
                                                <Link to={`/books/${item._id}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={3}>
                                                {' '}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )
                    }

                </Col>
            </Row>
        </div>
    );
}