const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct object', () => {
    var param = { from: "sri@example.com", text: "hello user"};
      var result = generateMessage(param.from, param.text);
      expect(result.from).toBe(param.from);
      expect(result.text).toBe(param.text);

  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var param = { from: "sri@example.com", latitude: "1234", longitude: "1234567"};
      var result = generateLocationMessage(param.from, param.latitude, param.longitude);
      expect(result.from).toBe(param.from);
      expect(result.url).toBe(`https://www.google.com/maps?q=${param.latitude},${param.longitude}`);
    //  expect(result.longitude).toBe(param.longitude);
  });
});
