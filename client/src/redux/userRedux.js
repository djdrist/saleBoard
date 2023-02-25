const createActionName = (actionName) => `app/user/${actionName}`;
const LOGIN = createActionName('LOGIN');
const LOGOUT = createActionName('LOGOUT');

export const getUser = (state) => state.user;

export const logIn = (payload) => ({ type: LOGIN, payload });
export const logOut = (payload) => ({ type: LOGOUT, payload });

const userReducer = (statePart = null, action = {}) => {
	switch (action.type) {
		case LOGIN:
			return action.payload.login;
		case LOGOUT:
			return null;
		default:
			return statePart;
	}
};

export default userReducer;
