import React, { useContext } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import BookScreen from './screens/BookScreen';
import HomeScreen from './screens/HomeScreen';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropDown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import SigninScreen from './screens/SigninScreen.js';
import { Store } from './store';
import CartScreen from './screens/CartScreen.js';
import SignupScreen from './screens/SignupScreen.js';
import NewBookScreen from './screens/NewBookScreen.js';

function App() {
  const {state, dispatch: ctxDispatch} = useContext(Store);
  const {cart, userInfo} = state;

  const signoutHandler = () => {
    ctxDispatch({type: 'USER_SIGNOUT'});
    localStorage.removeItem('userInfo');
  }

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header >
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Dyl's Book Store</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/book/add" className="nav-link">
                  Add
                </Link>
                <Link to="/cart" className="nav-link">
                  Cart
                  <Badge pill bg="danger">
                    {cart.cartItems.length}
                  </Badge>
                </Link>
                {userInfo ? (
                  <NavDropDown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropDown.Item>User Profile</NavDropDown.Item>
                    </LinkContainer>
                    <NavDropDown.Divider />
                    <Link className="dropdown-item" to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </NavDropDown>
                ):(
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
              </Nav>
              {/* <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  Cart
                </Link>
              </Nav> */}
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="books/:_id" element={<BookScreen />} />
              {/* <Route path="books/new" element={<NewBookScreen />} /> */}
              <Route path="cart" element={<CartScreen />} />
              <Route path="/book/add" element={<NewBookScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All right's reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
