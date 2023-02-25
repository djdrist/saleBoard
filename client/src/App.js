import { Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/views/Header';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Logout from './components/pages/Logout';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { API_URL } from './config';
import { logIn } from './redux/userRedux';
import PostAd from './components/pages/Ads/PostAd';
import ShowAd from './components/pages/Ads/ShowAd';
import EditAd from './components/pages/Ads/EditAd';

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		const options = {
			method: 'GET',
			credentials: 'include',
		};

		fetch(`${API_URL}/auth/user`, options).then((res) => {
			if (res.status === 200) {
				res.json().then((data) => {
					dispatch(logIn({ login: data.login }));
				});
			}
		});
	}, [dispatch]);
	return (
		<Container>
			<Header />
			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/logout'
					element={<Logout />}
				/>
				<Route
					path='/register'
					element={<Register />}
				/>
				<Route
					path='/ad/post'
					element={<PostAd />}
				/>
				<Route
					path='/ad/:id'
					element={<ShowAd />}
				/>
				<Route
					path='/ad/edit/:id'
					element={<EditAd />}
				/>
			</Routes>
		</Container>
	);
}

export default App;
