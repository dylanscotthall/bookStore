import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function Book(props) {
    const { book } = props;

    return (
        <Card key={book._id}>
            <Link to={`/books/${book._id}`}>
                <img src={book.image} className="card-img-top" alt={book.name} />
            </Link>
            <Card.Body>
                <Link to={`/books/${book._id}`}>
                    <Card.Title>{book.name}</Card.Title>
                </Link>
                <Card.Text>by {book.author}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Book;