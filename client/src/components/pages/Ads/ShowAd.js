import { useParams } from 'react-router-dom';
import { Button, Card, ButtonGroup, Spinner, Row } from 'react-bootstrap';
import { IMGS_URL } from '../../../config';
import { getUser } from '../../../redux/userRedux';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { API_URL } from '../../../config';
import { useNavigate } from 'react-router-dom';
import { deleteRequest } from '../../../redux/adsRedux';

const ShowAd = () => {
	const { id } = useParams();
	const user = useSelector(getUser);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [ad, setAd] = useState();

	useEffect(() => {
		const options = {
			method: 'GET',
			credentials: 'include',
		};
		setLoading(true);

		fetch(`${API_URL}/api/ads/${id}`, options)
			.then((res) => {
				if (res.status === 200) {
					res.json().then((data) => {
						setAd(data);
						console.log(data);
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
		setLoading(false);
	}, []);

	const deleteHandler = async () => {
		setLoading(true);
		dispatch(await deleteRequest(id));
		navigate('/');
		setLoading(false);
	};

	return (
		<>
			{loading && (
				<Spinner
					animation='border'
					role='status'></Spinner>
			)}
			{ad && (
				<Card className='col-6 my-3 p-0 mx-auto text-center'>
					<Card.Header>{ad.title}</Card.Header>
					<Card.Img
						variant='top'
						src={IMGS_URL + ad.photo.replace('public/', '')}
					/>
					<Card.Body>
						<Card.Title>Cena : {ad.price}</Card.Title>
						<Card.Subtitle className='m-4 text-muted'>
							<Row>
								<div className='h-25 w-25 col-4'>
									<Card.Img
										className='rounded-circle'
										src={IMGS_URL + 'uploads/' + ad.seller.avatar}
									/>
								</div>
								<div className='col-8 text-center my-auto'>
									<p>Sprzedający: {ad.seller.login}</p>
									<p>Telefon: {ad.seller.phone}</p>
									<p>Lokalizacja: {ad.location}</p>
								</div>
							</Row>
						</Card.Subtitle>
						<Card.Text>{ad.description}</Card.Text>
					</Card.Body>
					{user && user === ad.seller.login && (
						<ButtonGroup aria-label='Basic example'>
							<Button
								variant='secondary'
								onClick={() => navigate(`/ad/edit/${id}`)}>
								EDIT
							</Button>
							<Button
								variant='secondary'
								onClick={deleteHandler}>
								DELETE
							</Button>
						</ButtonGroup>
					)}
					<Card.Footer className='text-muted'>{ad.createdAt.split('T')[0]}</Card.Footer>
				</Card>
			)}
		</>
	);
};

export default ShowAd;
