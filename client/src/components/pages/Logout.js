import { API_URL } from '../../config';
import { logOut } from '../../redux/userRedux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const Logout = () => {
	const dispatch = useDispatch(logOut());

	useEffect(() => {
		const options = {
			method: 'DELETE',
		};
		fetch(`${API_URL}/auth/logout`, options).then(() => dispatch(logOut()));
	}, [dispatch]);
};

export default Logout;
