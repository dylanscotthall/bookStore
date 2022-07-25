import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Store } from '../store';

export default function SignupScreen(){
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');


    const submitHandler = async (e) => {
        e.preventDefault();
        const {data} = await Axios.post('/api/books/add', {
            name,
            author,
            description,
        });
        navigate('/');
    }

    return(
        <Container className="small-container">
            <Helmet>
                <title>Add Book</title>
            </Helmet>
            <h1 className="my-3">Add Book</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control required onChange={(e) => setName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Author</Form.Label>
                    <Form.Control required onChange={(e) => setAuthor(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Description</Form.Label>
                    <Form.Control required onChange={(e) => setDescription(e.target.value)}/>
                </Form.Group>
                <div className="mb-3">
                    <Button type="submit">Add Book</Button>
                </div>
            </Form>
        </Container>
    );
}