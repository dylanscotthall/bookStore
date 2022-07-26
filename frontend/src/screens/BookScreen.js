import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { Store } from '../store';
import { Link } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, book: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  };
}

function BookScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { _id } = params;

  const [{ loading, error, book }, dispatch] = useReducer(reducer, {
    book: [],
    loading: true,
    error: '',
  });
  //const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/books/${_id}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
      // setBooks(result.data);
    };
    fetchData();
  }, [_id]);

  const {state, dispatch: ctxDispatch} = useContext(Store);
  const {cart}=state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === book._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const {data} = await axios.get(`/api/books/${book._id}`);
    ctxDispatch({type:'CART_ADD_ITEM', payload: {...book, quantity: 1}});
    navigate('/cart');
  }

  const deleteBook = async () => {
    await axios.delete(`/api/books/${book._id}`);
  }

  return (
    loading ? (
      <LoadingBox />
    ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
    ) : (
      <div>
        <Row>
          <Col md={6}>
            <img className="img-large" src={book.image} alt={book.name} />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Helmet>
                  <title>{book.name}</title>
                </Helmet>
                <h1>{book.name}</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>by {book.author}</h2>
              </ListGroup.Item>
            </ListGroup>
            <p>{book.description}</p>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <div className="d-grid">
                    <button onClick={addToCartHandler}>Buy</button>
                    <hr/>
                    <Link to='/'>
                      <button onClick={deleteBook}>Delete</button>
                    </Link>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    )
  );
}

export default BookScreen;