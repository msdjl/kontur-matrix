"use strict";
const chai = require('chai');
const expect = chai.expect;
const clone = require('../dist/Util').clone;
const Matrix = require('../dist/Matrix');
const defaultMatrix = [[0,0],[0,0]];
const someMatrix = [[1,0],[2,1]];
const someBigMatrix = [[1,2,3,4,5],[5,4,3,2,1],[0,5,7,6,6],[1,4,6,3,6]];
const someAnotherBigMatrix = [[1,2,3,4,5],[5,4,3,2,1],[0,5,7,6,6],[1,4,6,3,6],[6,3,1,5,8]];
const multipliedBigMatrices = [[45,56,59,63,89],[33,52,61,57,67],[67,97,106,100,131],[60,78,81,87,111]];

describe('Matrix', function () {
	describe('constructor', function () {
		it('allows to use default constructor with predefined value', function () {
			const m = new Matrix();
			expect(m.value).to.deep.equal(defaultMatrix);
		});
		it('allows to create matrix with user value', function () {
			const m = new Matrix(someMatrix);
			expect(m.value).to.deep.equal(someMatrix);
		});
	});
	describe('methods', function () {
		let m = null;
		beforeEach(function () {
			m = new Matrix(someBigMatrix);
		});
		it('can add new row', function () {
			let newValue = clone(someBigMatrix);
			newValue.push([0,0,0,0,0]);
			
			m.addRow();
			expect(m.value).to.deep.equal(newValue);
		});
		it('can delete last row', function () {
			let newValue = clone(someBigMatrix);
			newValue.pop();
			
			m.deleteRow();
			expect(m.value).to.deep.equal(newValue);
		});
		it('can add new column', function () {
			let newValue = clone(someBigMatrix);
			for (let i = 0; i < newValue.length; i++) {
				newValue[i].push(0);
			}
			
			m.addColumn();
			expect(m.value).to.deep.equal(newValue);
		});
		it('can delete last column', function () {
			let newValue = clone(someBigMatrix);
			for (let i = 0; i < newValue.length; i++) {
				newValue[i].pop();
			}

			m.deleteColumn();
			expect(m.value).to.deep.equal(newValue);
		});
		it('can clean matrix', function () {
			let newValue = clone(someBigMatrix);
			for (let i = 0; i < newValue.length; i++) {
				for (let j = 0; j < newValue[i].length; j++) {
					newValue[i][j] = 0;
				}
			}
			
			m.clean();
			expect(m.value).to.deep.equal(newValue);
		});
		it('can multiply matrices with Matrix instance as a parameter', function () {
			const m2 = new Matrix(someAnotherBigMatrix);
			expect(Matrix.multiply(m, m2).value).to.deep.equal(multipliedBigMatrices);
		});
		it('can multiply matrices with array as a parameter', function () {
			expect(Matrix.multiply(m, someAnotherBigMatrix).value).to.deep.equal(multipliedBigMatrices);
		});
		it('should throw error when number of matrix A columns different from number of matrix B rows', function () {
			const m2 = new Matrix(someAnotherBigMatrix);
			expect(function() {Matrix.multiply(m2, m)}).to.throw(Error);
		});
	});
});
