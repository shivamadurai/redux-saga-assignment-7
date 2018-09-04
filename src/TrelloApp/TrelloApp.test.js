const { createStore } = require('redux');
const TrelloApp = require('.');
const should = require('chai').should();
const deepFreeze = require('deep-freeze');
 
describe('TrelloApp unit testing', function() {
 
  it('should ADD_CARD', function() {

    const currState = {
      currentBoard: {
        id: 'board1',
        name: 'MyBoard',
        lists: [{
          id: '111',
          name: 'Some List Name',
          cards: [{
            id: 'abc',
            text: 'def'
          }, {
            id: 'abc1',
            text: 'def1'
          }]
        }, {
          id: '112',
          name: 'Some List Name 1',
          cards: []
        }]
      }
    };

    const store = createStore(TrelloApp, currState);

    const action = {
      type: 'ADD_CARD',
      payload: {
        listId: '111',
        text: 'ghi'
      }
    };

    store.dispatch(action);
 
    store.getState().should.have.property('currentBoard');
    store.getState().currentBoard.should.have.property('lists').and.be.an('array').of.length(2);
    store.getState().currentBoard.lists[0].should.have.property('cards').and.be.an('array').of.length(3);
    store.getState().currentBoard.lists[0].cards[2].should.have.property('id');
    store.getState().currentBoard.lists[0].cards[2].should.have.property('text').and.equal('ghi');
  });
 
  it('should EDIT_CARD', function () {

    const currState = {
      currentBoard: {
        id: 'board1',
        name: 'MyBoard',
        lists: [{
          id: '111',
          name: 'Some List Name',
          cards: [{
            id: 'abc',
            text: 'def'
          }, {
            id: 'abc1',
            text: 'def1'
          }]
        }, {
          id: '112',
          name: 'Some List Name 1',
          cards: []
        }]
      }
    };

    const store = createStore(TrelloApp, currState);
 
    const action = {
      type: 'EDIT_CARD',
      payload: {
        listId: '111',
        cardId: 'abc',
        text: 'hello'
      }
    };
    store.dispatch(action);
 
    store.getState().should.have.property('currentBoard');
    store.getState().currentBoard.should.have.property('lists').and.be.an('array').of.length(2);
    store.getState().currentBoard.lists[0].should.have.property('cards').and.be.an('array').of.length(2);
    store.getState().currentBoard.lists[0].cards[0].should.have.property('id');
    store.getState().currentBoard.lists[0].cards[0].should.have.property('text').and.equal('hello');
  });

  it('should MOVE_CARD', function() {
    const currState = {
      currentBoard: {
        id: 'board1',
        name: 'MyBoard',
        lists: [{
          id: '111',
          name: 'Some List Name',
          cards: [{
            id: 'abc',
            text: 'def'
          }, {
            id: 'abc1',
            text: 'def1'
          }]
        }, {
          id: '112',
          name: 'Some List Name 1',
          cards: []
        }]
      }
    };

    const store = createStore(TrelloApp, currState);

    const fromIndex = 0;
    const toIndex = 1;
    const previousIndexCard = store.getState().currentBoard.lists[0].cards[fromIndex];
    const action = {
      type: 'MOVE_CARD',
      payload: {
        fromIndex: fromIndex,
        toIndex: toIndex
      }
    };

    store.dispatch(action);

    store.getState().should.have.property('currentBoard');
    store.getState().currentBoard.lists[0].should.have.property('cards').and.be.an('array').of.length(2);
    store.getState().currentBoard.lists[0].cards[toIndex].should.have.property('id').and.equal(previousIndexCard.id);
  });
 
  it('should CREATE_LIST', function() {

    const currState = {
      currentBoard: {
        id: 'board1',
        name: 'MyBoard',
        lists: [{
          id: '111',
          name: 'Some List Name',
          cards: [{
            id: 'abc',
            text: 'def'
          }, {
            id: 'abc1',
            text: 'def1'
          }]
        }, {
          id: '112',
          name: 'Some List Name 1',
          cards: []
        }]
      }
    };

    const store = createStore(TrelloApp, currState);

    const action = {
      type: 'CREATE_LIST',
      payload: {
        boardId: 'board1',
        name: "new-list"
      }
    };
    store.dispatch(action);

    store.getState().should.have.property('currentBoard');
    store.getState().currentBoard.should.have.property('lists').and.be.an('array').of.length(3);
    store.getState().currentBoard.lists[2].should.have.property('name').and.equal('new-list');
  });

  it('should EDIT_LIST', function () {
    const currState = {
      currentBoard: {
        id: 'board1',
        name: 'MyBoard',
        lists: [{
          id: '111',
          name: 'Some List Name',
          cards: [{
            id: 'abc',
            text: 'def'
          }, {
            id: 'abc1',
            text: 'def1'
          }]
        }, {
          id: '112',
          name: 'Some List Name 1',
          cards: []
        }]
      }
    };

    const store = createStore(TrelloApp, currState);

    const action = {
      type: 'EDIT_LIST',
      payload: {
        listId: '111',
        name: "pramith"
      }
    };
    store.dispatch(action);

    store.getState().should.have.property('currentBoard');
    store.getState().currentBoard.should.have.property('lists').and.be.an('array').of.length(2);
    store.getState().currentBoard.lists[0].should.have.property('cards').and.be.an('array').of.length(2);
    store.getState().currentBoard.lists[0].should.have.property('name').and.equal('pramith');
  });
 
  it('should EDIT_BOARD', function() {
    const currState = {
      currentBoard: {
        id: 'board1',
        name: 'MyBoard',
        lists: [{
          id: '111',
          name: 'Some List Name',
          cards: [{
            id: 'abc',
            text: 'def'
          }, {
            id: 'abc1',
            text: 'def1'
          }]
        }, {
          id: '112',
          name: 'Some List Name 1',
          cards: []
        }]
      }
    };

    const store = createStore(TrelloApp, currState);

    const action = {
      type: 'EDIT_BOARD',
      payload: {
        name: "New Board"
      }
    };
    store.dispatch(action);

    store.getState().should.have.property('currentBoard');
    store.getState().currentBoard.should.have.property('lists').and.be.an('array').of.length(2);
    store.getState().currentBoard.should.have.property('id');
    store.getState().currentBoard.should.have.property('name').and.equal('New Board');
  });

});
 