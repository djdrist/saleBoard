import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { API_URL } from '../../config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdForm = (props) => {
	const user = useSelector((state) => state.user);
	const navigate = useNavigate();
	const [title, setTitle] = useState(props.title || '');
	const [description, setDescription] = useState(props.description || '');
	const [price, setPrice] = useState(props.price || '');
	const [location, setLocation] = useState(props.location || '');
	const [photo, setPhoto] = useState(null);
	const [status, setStatus] = useState(null);

	const submitHandler = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('title', title);
		formData.append('description', description);
		formData.append('price', price);
		formData.append('location', location);
		formData.append('seller', user);
		formData.append('photo', photo);
		let options = {
			method: 'POST',
			body: formData,
			credentials: 'include',
		};
		setStatus('loading');
		if (props.new) {
			fetch(`${API_URL}/api/ads`, options).then((res) => {
				if (res.status === 201) {
					setStatus(null);
					navigate('/');
				} else if (res.status === 400) {
					setStatus('clientError');
				} else {
					setStatus('serverError');
				}
			});
		} else {
			options.method = 'PUT';
			fetch(`${API_URL}/api/ads/${props._id}`, options).then((res) => {
				if (res.status === 200) {
					setStatus(null);
					navigate('/');
				} else if (res.status === 400) {
					setStatus('clientError');
				} else {
					setStatus('serverError');
				}
			});
		}
	};

	return (
		<Form
			className='col-12 col-sm-3 mx-auto text-center'
			onSubmit={submitHandler}>
			<h1 className='my-4'>{props.new ? 'Post new Ad' : 'Edit Ad'}</h1>

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
			{status === 'loading' && (
				<Spinner
					animation='border'
					role='status'></Spinner>
			)}
			<Form.Group
				className='mb-3'
				controlId='formTitle'>
				<Form.Label>Title</Form.Label>
				<Form.Control
					type='text'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder='Title'
				/>
			</Form.Group>
			<Form.Group
				className='mb-3'
				controlId='formPrice'>
				<Form.Label>Price</Form.Label>
				<Form.Control
					type='number'
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					placeholder='Price'
				/>
			</Form.Group>
			<Form.Group
				className='mb-3'
				controlId='formLocation'>
				<Form.Label>Location</Form.Label>
				<Form.Control
					type='text'
					value={location}
					onChange={(e) => setLocation(e.target.value)}
					placeholder='Location'
				/>
			</Form.Group>
			<Form.Group
				className='mb-3'
				controlId='formDescription'>
				<Form.Label>Description</Form.Label>
				<Form.Control
					as='textarea'
					rows={3}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder='Description'
				/>
			</Form.Group>
			<Form.Group
				className='mb-3'
				controlId='formFile'>
				<Form.Label>Photo</Form.Label>
				<Form.Control
					type='file'
					onChange={(e) => setPhoto(e.target.files[0])}
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

export default AdForm;
