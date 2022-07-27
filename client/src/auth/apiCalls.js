import { loginFailure, loginSuccess, loginStart } from './AuthActions';
import axios from 'axios';

export const login = async (user, dispatch) =>{
		dispatch(loginStart());
		try{
				const response = await axios.post('auth/login', user);
				dispatch(loginSuccess(response.data));
		}catch(error){
				dispatch(loginFailure(error.response.data));
		}
};