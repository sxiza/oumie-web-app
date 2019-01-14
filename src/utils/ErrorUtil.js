class ErrorUtil {
    static get CODE_VALIDATION() { return 422 }
    static get CODE_UNAUTHORIZED() { return 400 }

	static getMessages({ response }) {
		switch(response.status) {
            case this.CODE_VALIDATION:
                return response.data.errors;
            case this.CODE_UNAUTHORIZED:
                return response.data;
            default:
                return response.statusText;
        }
    }
}

export default ErrorUtil;