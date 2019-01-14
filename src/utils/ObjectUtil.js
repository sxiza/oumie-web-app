class ObjectUtil {
	static isEmpty(object) { 
		if (!object) {
			return true;
		}

		return Object.keys(object).length <= 0; 
	}
    
    static isNotEmpty(object) {
		return this.constructor.isEmpty(object);
    }
}

export default ObjectUtil;