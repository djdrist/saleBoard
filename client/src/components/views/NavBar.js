import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import Search from '../features/Search';
import { useSelector } from 'react-redux';

const NavBar = () => {
	const user = useSelector((state) => state.user);
	return (
		<Navbar
			bg='primary'
			variant='dark'
			expand='lg'>
			<Container fluid>
				<Navbar.Brand
					as={Link}
					to='/'>
					SaleBoard.app
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='navbarScroll' />
				<Navbar.Collapse id='navbarScroll'>
					<Nav
						className='me-auto my-2 my-lg-0'
						style={{ maxHeight: '100px' }}
						navbarScroll>
						{!user && (
							<Nav.Link
								as={NavLink}
								to='/login'>
								Sign In
							</Nav.Link>
						)}
						{user && (
							<>
								<Nav.Link
									as={NavLink}
									to='/logout'>
									Sign Out
								</Nav.Link>
								<Nav.Link
									as={NavLink}
									to='/ad/post'>
									Post Ad
								</Nav.Link>
							</>
						)}
						{!user && (
							<Nav.Link
								as={NavLink}
								to='/register'>
								Sign Up
							</Nav.Link>
						)}
					</Nav>
					<Search />
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBar;
