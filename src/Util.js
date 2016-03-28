const Util = {
	clone: function (array) {
		let result = [];
		for (let i = 0; i < array.length; i++) {
			if (array[i] instanceof(Array)) {
				result[i] = Util.clone(array[i]);
			} else {
				result[i] = array[i];
			}
		}
		return result;
	}
};

(typeof module !== 'undefined') && (module.exports = Util);
