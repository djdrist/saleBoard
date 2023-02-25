import AdForm from '../../features/AdForm';
import { useParams } from 'react-router-dom';
import { getAdById } from '../../../redux/adsRedux';
import { useSelector } from 'react-redux';

const EditAd = () => {
	const { id } = useParams();
	const ad = useSelector((state) => getAdById(state, id));
	console.log(ad);

	return (
		<>
			<AdForm {...ad} />
		</>
	);
};
export default EditAd;
