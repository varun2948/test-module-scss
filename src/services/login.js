import { api, loginHeaderAPI } from './index';

const loginUser = (payload) => loginHeaderAPI(api).post('/login/', payload);
export default loginUser;
