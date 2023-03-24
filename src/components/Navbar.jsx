import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {
	return (
		<>
			<Navbar bg="dark" variant="dark" fixed="top">
				<Container>
					<Navbar.Brand>Project 1</Navbar.Brand>
					<Nav className="me-auto">
						<Nav.Link href="/">Current Rates</Nav.Link>
						<Nav.Link href="/conversions">Conversions</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
		</>
	);
};

export default NavBar;
