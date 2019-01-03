'use strict'

import ErrorUtil from '../../utils/ErrorUtil'

class SoundclipHttp {
    constructor(client) {
        this.client = client;
        this.prefix = `/soundclip`;
    }

    /**
	 * Get all Beneficiaries owned by current User
	 *
	 * @method get
	 *
	 * @return {Object} Beneficiary
	 */
    // async get(id) {
    //     try {
    //         return (await this.client.get(this.prefix + `/${id}`)).data;
    //     }
    //     catch (error) {
    //         console.error(ErrorUtil.getMessages(error));
    //         return error;
    //     }
    // }

    /**
	 * Get list of Soundclips the current User has recorded
	 *
	 * @method getAll
     * @param  {Integer} beneficiary_id
	 *
	 * @return {Object} List of Beneficiaries
	 */
    async getAll({ beneficiaryID = null, load = [] }) {
        try {
            return (await this.client.get(this.prefix, {
                params: {
                    beneficiary_id: beneficiaryID,
                    load
                }
            })).data;
        }
        catch (error) {
            console.error(ErrorUtil.getMessages(error));
            return error;
        }
    }
}

export default SoundclipHttp