import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { API_URL } from '../../config';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/userRedux';

const Login = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [status, setStatus] = useState(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		const options = {
			method: 'POST',
			body: JSON.stringify({ login, password }),
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		};
		fetch(`${API_URL}/auth/login`, options)
			.then((res) => {
				if (res.status === 200) {
					dispatch(logIn({ login }));
					navigate('/');
				} else if (res.status === 400) {
					setStatus('clientError');
				} else {
					setStatus('serverError');
				}
			})
			.catch((err) => {
				setStatus('serverError');
			});
	};
	return (
		<Form
			className='col-12 col-sm-3 mx-auto text-center'
			onSubmit={submitHandler}>
			<h1 className='my-4'>Sign Up</h1>

			{status === 'clientError' && (
				<Alert variant='danger'>
					<Alert.Heading>Wrong data</Alert.Heading>
					<p>Login or password are incorrect</p>
				</Alert>
			)}
			{status === 'serverError' && (
				<Alert variant='danger'>
					<Alert.Heading>Something went wrong</Alert.Heading>
					<p>Error, try again</p>
				</Alert>
			)}
			{status === 'loading' && (
				<Spinner
					animation='border'
					role='status'></Spinner>
			)}

			<Form.Group
				className='mb-3'
				controlId='formLogin'>
				<Form.Label>Login</Form.Label>
				<Form.Control
					type='text'
					value={login}
					onChange={(e) => setLogin(e.target.value)}
					placeholder='Enter login'
				/>
			</Form.Group>
			<Form.Group
				className='mb-3'
				controlId='formPassword'>
				<Form.Label>Password</Form.Label>
				<Form.Control
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder='Password'
				/>
			</Form.Group>
			<Button
				variant='primary'
				type='submit'>
				Submit
			</Button>
		</Form>
	);
};

export default Login;
