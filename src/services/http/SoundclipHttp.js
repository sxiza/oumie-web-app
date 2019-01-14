'use strict'

import ErrorUtil from '../../utils/ErrorUtil'

class SoundclipHttp {
    constructor(client) {
        this.client = client;
        this.prefix = `/soundclip`;
    }

    /**
	 * Get the buffer stream to play a Soundclip
	 *
	 * @method play
	 *
	 * @return {Object} Beneficiary
	 */
    async create({ soundclip, beneficiaryID, onUploadProgress = () => {} }) {
        try {
            let data = new FormData();
            data.append('soundclip', soundclip, soundclip.name);
            data.append('beneficiary_id', beneficiaryID);
            
            return (await this.client.post(this.prefix, data, {
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`
                },
                onUploadProgress,
                timeout: 30000
            })).data;
        } catch (error) {
            console.error(ErrorUtil.getMessages(error));
            return error;
        }
    }

    /**
	 * Get the buffer stream to play a Soundclip
	 *
	 * @method play
	 *
	 * @return {Object} Beneficiary
	 */
    async play(id) {
        try {
            return (await this.client.get(this.prefix + `/${id}/play`, {
                responseType: 'arraybuffer',
            })).data;
        } catch (error) {
            console.error(ErrorUtil.getMessages(error));
            return error;
        }
    }

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
        } catch (error) {
            console.error(ErrorUtil.getMessages(error));
            return error;
        }
    }
}

export default SoundclipHttp