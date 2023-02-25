import { API_URL } from '../config';

const createActionName = (actionName) => `app/ads/${actionName}`;
const LOAD_ADS = createActionName('LOAD_ADS');
const ADD_AD = createActionName('ADD_AD');
const DELETE_AD = createActionName('DELETE_AD');

export const getAllAds = (state) => state.ads;
export const getAdById = (state, id) => state.ads.find((ad) => ad._id === id);

export const loadAds = (payload) => ({ payload, type: LOAD_ADS });
export const addAd = (payload) => ({ payload, type: ADD_AD });
export const deleteAd = (payload) => ({ payload, type: DELETE_AD });

export const fetchRequest = async () => {
	return (dispatch) => {
		const options = {
			method: 'GET',
			credentials: 'include',
		};
		fetch(`${API_URL}/api/ads`, options).then((res) => {
			if (res.status === 200) {
				res.json().then((data) => {
					dispatch(loadAds({ data }));
				});
			}
		});
	};
};

export const searchRequest = async (searchPhrase) => {
	return (dispatch) => {
		console.log(searchPhrase);
		const options = {
			method: 'GET',
			credentials: 'include',
		};
		fetch(`${API_URL}/api/ads/search/${searchPhrase}`, options).then((res) => {
			if (res.status === 200) {
				res.json().then((data) => {
					dispatch(loadAds({ data }));
				});
			}
		});
	};
};

// export const editTableRequest = (tableInfo) => {
// 	return (dispatch) => {
// 		const options = {
// 			method: 'PUT',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify(tableInfo),
// 		};
// 		fetch(`${API_URL}/tables/${tableInfo.id}`, options).then(() => dispatch(editTable(tableInfo)));
// 	};
// };

export const deleteRequest = async (id) => {
	return (dispatch) => {
		const options = {
			method: 'DELETE',
			credentials: 'include',
		};
		fetch(`${API_URL}/api/ads/${id}`, options).then(() => dispatch(deleteAd(id)));
	};
};

const adsReducer = (statePart = [], action = {}) => {
	switch (action.type) {
		case LOAD_ADS:
			return [...action.payload.data];
		case DELETE_AD:
			return statePart.filter((ad) => ad._id !== action.payload);
		default:
			return statePart;
	}
};

export default adsReducer;

// const tablesReducer = (statePart = [], action) => {
// 	switch (action.type) {
// 		case UPDATE_TABLES:
// 			return [...action.payload];
// 		case DELETE_TABLE:
// 			return statePart.filter((table) => table.id !== action.payload);
// 		case ADD_TABLE:
// 			return [...statePart, action.payload];
// 		case EDIT_TABLE:
// 			return statePart.map((table) => (table.id === action.payload.id ? { ...table, ...action.payload } : table));
// 		default:
// 			return statePart;
// 	}
// };
