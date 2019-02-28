const expect = require('expect');
const { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct object', () => {
    var param = { from: "sri@example.com", text: "hello user"};
      var result = generateMessage(param.from, param.text);
      expect(result.from).toBe(param.from);
      expect(result.text).toBe(param.text);

  });
});
