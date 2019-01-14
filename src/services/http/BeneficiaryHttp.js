'use strict'

import ErrorUtil from '../../utils/ErrorUtil'

class BeneficiaryHttp {
    constructor(client) {
        this.client = client;
        this.prefix = `/beneficiary`;
    }

    /**
	 * Get specific beneficiary data
	 *
	 * @method get
	 *
	 * @return {Object} Beneficiary
	 */
    async show(id) {
        try {
            return (await this.client.get(this.prefix + `/${id}`)).data;
        }
        catch (error) {
            console.error(ErrorUtil.getMessages(error));
            return error;
        }
    }

    /**
	 * Get all Beneficiaries owned by current User
	 *
	 * @method getAll
	 *
	 * @return {Object} List of Beneficiaries
	 */
    async getAll() {
        try {
            return (await this.client.get(this.prefix)).data;
        }
        catch (error) {
            console.error(ErrorUtil.getMessages(error));
            return error;
        }
    }
}

export default BeneficiaryHttp