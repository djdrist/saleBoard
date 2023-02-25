import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAds, fetchRequest } from '../../redux/adsRedux';
import { Container, Spinner, Row } from 'react-bootstrap';
import SingleAd from '../views/SingleAd';

const Home = () => {
	const dispatch = useDispatch();
	const ads = useSelector(getAllAds);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const fetch = async () => {
			setLoading(true);
			dispatch(await fetchRequest());
			setLoading(false);
		};
		fetch();
	}, [dispatch]);
	return (
		<Container className='my-5 text-center'>
			<Row className='justify-content-center'>
				{loading && (
					<Spinner
						animation='border'
						role='status'></Spinner>
				)}
				{ads.map((ad) => (
					<SingleAd
						key={ad._id}
						{...ad}
					/>
				))}
			</Row>
		</Container>
	);
};

export default Home;
