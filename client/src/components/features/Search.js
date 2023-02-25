import { Form, Button, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRequest, searchRequest } from '../../redux/adsRedux';

const Search = () => {
	const dispatch = useDispatch();
	const [search, setSearch] = useState('');
	const [loading, setLoading] = useState(false);

	const searchHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (search.length !== 0) {
			dispatch(await searchRequest(search));
		} else {
			dispatch(await fetchRequest());
		}
		setLoading(false);
	};

	return (
		<Form
			className='d-flex'
			onSubmit={searchHandler}>
			{loading && (
				<Spinner
					animation='border'
					role='status'></Spinner>
			)}
			<Form.Control
				type='search'
				placeholder='Search'
				className='me-2'
				aria-label='Search'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<Button
				variant='light'
				onClick={searchHandler}>
				Search
			</Button>
		</Form>
	);
};

export default Search;
