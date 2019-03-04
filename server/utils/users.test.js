const expect = require('expect');
const { Users } = require('./users');

describe("User", () => {
    var users;
    beforeEach(() => {
      users = new Users();
      users.users = [
        {
          id: '1',
          name: 'sri',
          room: 'developer react 12'
        },
        {
          id: '2',
          name: 'jen',
          room: 'developer angular 12'
        },
        {
          id: '3',
          name: 'novam',
          room: 'developer react 12'
        },
      ]
    });
    it("should add new user", () => {
        var users =  new Users();
        var user = {
          id: '123',
          name: 'Srikalyan',
          room: 'Developer Room 12'
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });
    it('should remove user', () => {
        var result = users.removeUser('1');
        expect(result.id).toBe('1');
        expect(users.users.length).toBe(2);
    });
    it('should not remove user', () => {
      var result = users.removeUser('12');
      expect(result).toBe(undefined);
      expect(users.users.length).toBe(3);
    });
    it('should find user', () => {
      var result = users.getUser('1');
      expect(result.id).toBe('1');
    });
    it('should not find user', () => {
      var result = users.getUser('12');
      expect(result).toBe(undefined);
    });
    it('should return names for node', () => {
      var userList = users.getUserList('developer react 12');
      expect(userList).toEqual(['sri','novam'])
    });
});
