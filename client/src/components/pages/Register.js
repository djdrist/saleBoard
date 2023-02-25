import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { API_URL } from '../../config';

const Register = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [phone, setPhone] = useState('');
	const [avatar, setAvatar] = useState(null);
	const [status, setStatus] = useState(null);

	const submitHandler = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('login', login);
		formData.append('password', password);
		formData.append('phone', phone);
		formData.append('avatar', avatar);

		const options = {
			method: 'POST',
			body: formData,
		};
		setStatus('loading');
		fetch(`${API_URL}/auth/register`, options).then((res) => {
			if (res.status === 201) {
				setStatus('success');
				setLogin('');
				setPassword('');
				setPhone('');
				setAvatar(null);
			} else if (res.status === 400) {
				setStatus('clientError');
			} else if (res.status === 409) {
				setStatus('loginError');
			} else {
				setStatus('serverError');
			}
		});
	};

	return (
		<Form
			className='col-12 col-sm-3 mx-auto text-center'
			onSubmit={submitHandler}>
			<h1 className='my-4'>Sign Up</h1>

			{status === 'success' && (
				<Alert variant='success'>
					<Alert.Heading>Success!</Alert.Heading>
					<p>Registration successful!</p>
				</Alert>
			)}
			{status === 'clientError' && (
				<Alert variant='danger'>
					<Alert.Heading>Not enough data</Alert.Heading>
					<p>You have to fill all fields</p>
				</Alert>
			)}
			{status === 'serverError' && (
				<Alert variant='danger'>
					<Alert.Heading>Something went wrong</Alert.Heading>
					<p>Error, try again</p>
				</Alert>
			)}
			{status === 'loginError' && (
				<Alert variant='warning'>
					<Alert.Heading>Login in use</Alert.Heading>
					<p>Please use different login</p>
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
			<Form.Group
				className='mb-3'
				controlId='formPhone'>
				<Form.Label>Phone Number</Form.Label>
				<Form.Control
					type='tel'
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					placeholder='Phone number'
				/>
			</Form.Group>
			<Form.Group
				className='mb-3'
				controlId='formFile'>
				<Form.Label>Avatar</Form.Label>
				<Form.Control
					type='file'
					onChange={(e) => setAvatar(e.target.files[0])}
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

export default Register;
