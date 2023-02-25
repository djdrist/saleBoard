import { Button, Card, ButtonGroup } from 'react-bootstrap';
import { IMGS_URL } from '../../config';
import { getUser } from '../../redux/userRedux';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { deleteRequest } from '../../redux/adsRedux';

const SingleAd = (props) => {
	const user = useSelector(getUser);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	const deleteHandler = async () => {
		setLoading(true);
		dispatch(await deleteRequest(props._id));
		navigate('/');
		setLoading(false);
	};

	return (
		<Card className='col-3 m-2 p-0'>
			<Card.Img
				className='width: 18rem;'
				variant='top'
				src={IMGS_URL + props.photo.replace('public/', '')}
			/>
			<Card.Body>
				<Card.Title>{props.title}</Card.Title>
				<Card.Text>{props.location}</Card.Text>
				<Button
					variant='primary'
					onClick={() => navigate(`/ad/${props._id}`)}>
					See more!
				</Button>
			</Card.Body>
			{user && user === props.seller.login && (
				<ButtonGroup aria-label='Basic example'>
					<Button
						variant='secondary'
						onClick={() => navigate(`/ad/edit/${props._id}`)}>
						EDIT
					</Button>
					<Button
						variant='secondary'
						onClick={deleteHandler}>
						DELETE
					</Button>
				</ButtonGroup>
			)}
		</Card>
	);
};

export default SingleAd;
