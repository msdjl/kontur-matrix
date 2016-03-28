const Util = Util || require('./Util');
const clone = Util.clone;

class Matrix {
	constructor(value = [[0,0],[0,0]]) {
		//TODO: validation
		this.value = clone(value);
	}

	getValue() {
		return this.value;
	}

	getSize() {
		return {cols: this.value[0].length, rows: this.value.length};
	}

	addRow() {
		this.value.push(new Array(this.getSize().cols).fill(0));
	}

	deleteRow() {
		this.value.pop();
	}

	addColumn() {
		this.value.forEach(i => i.push(0));
	}

	deleteColumn() {
		this.value.forEach(i => i.pop());
	}

	clean() {
		const size = this.getSize();
		this.value = new Array(size.rows).fill(0).map(() => new Array(size.cols).fill(0));
	}

	static multiply(a, b) {
		a instanceof(Matrix) || (a = new Matrix(a));
		b instanceof(Matrix) || (b = new Matrix(b));
		const aRows = a.getSize().rows;
		const aCols = a.getSize().cols;
		const bRows = b.getSize().rows;
		const bCols = b.getSize().cols;
		if (aCols !== bRows) throw new Error('Invalid data');

		const result = new Array(aRows).fill(0).map(() => new Array(bCols));
		for (let i = 0; i < aRows; i++) {
			for (let j = 0; j < bCols; j++) {
				let sum = 0;
				for (let k = 0; k < aCols; k++) {
					sum += a.value[i][k] * b.value[k][j];
				}
				result[i][j] = sum;
			}
		}
		return new Matrix(result);
	}
}

(typeof module !== 'undefined') && (module.exports = Matrix);
