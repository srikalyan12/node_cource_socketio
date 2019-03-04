const expect = require('expect');
const { isRealString } = require('./validation');

describe('validate string', () =>{
    it('is RealString return false for empty string', () => {
        var result = isRealString(90);
        expect(result).toBe(false);
    });
    it('is RealString return false with space only', () => {
        var result = isRealString('  ');
        expect(result).toBe(false);
    });
    it('is RealString return false with space only', () => {
        var result = isRealString(' df  ff ');
        expect(result).toBe(true);
    });
});
