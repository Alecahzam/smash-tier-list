import characterReducer, { initialState } from './reducer';
import { StateError, ActionError } from '../../errors';
import { addCharacter } from './actions';

export const validCharacter = {
  name: 'Sonic',
  tier: 'S',
  avatarUrl: 'https://via.placeholder.com/50x50',
};


describe('character reducer', () => {
  it('should return the initial state if no state & action are provided', () => {
    expect(characterReducer()).to.deep.equal(initialState);
  });
  it('should return the same state if no action provided', () => {
    expect(characterReducer('CURRENT STATE')).to.equal('CURRENT STATE');
  });

  describe('has ADD_CHARACTER handler that', () => {
    it('returns a new character', () => {
      expect(
        characterReducer(undefined, addCharacter(validCharacter)),
      ).to.deep.equal({ ...initialState, ...validCharacter });
    });

    describe('throws error if', () => {
      it('state is not undefined', () => {
        expect(() => {
          characterReducer('UNEXPECTED STATE', addCharacter(validCharacter));
        }).to.throw(StateError);
      });
      it('character.name is not a string', () => {
        expect(() => {
          characterReducer(undefined, addCharacter({ ...validCharacter, name: 7 }));
        }).to.throw(ActionError);
      });
      it('character.tier is not a string', () => {
        expect(() => {
          characterReducer(undefined, addCharacter({ ...validCharacter, tier: 7 }));
        }).to.throw(ActionError);
      });
      it('character.avatarUrl is not a valid link', () => {
        expect(() => {
          characterReducer(undefined, addCharacter({ ...validCharacter, avatarUrl: 'asd' }));
        }).to.throw(ActionError);
      });
    });
  });
});