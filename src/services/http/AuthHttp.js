'use strict'

import qs from 'qs'
import ErrorUtil from '../../utils/ErrorUtil'

class AuthHttp {
    constructor(client) {
        this.client = client;
        this.prefix = `/auth`;
    }

    /**
	 * Register user
	 *
	 * @method register
	 *
	 * @return {Object} Oumienet User
	 */
    async register({ mobile, name, surname, password, passwordConfirm }) {
        try {
            return (await this.client.post(this.prefix + `/register`, qs.stringify({
                mobile, name, surname, password, 
                password_confirmation: passwordConfirm
            }))).data;
        }
        catch (error) {
            console.error(ErrorUtil.getMessages(error));
            return error;
        }
    }
}

export default AuthHttp