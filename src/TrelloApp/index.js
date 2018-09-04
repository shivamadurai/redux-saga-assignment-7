function TrelloApp(currState, action) {

  switch(action.type) {
    case 'ADD_CARD':
      const list = currState.currentBoard.lists.find(list => list.id === action.payload.listId);
      const index = currState.currentBoard.lists.indexOf(list);
      const newList = Object.assign({}, list, {
        cards: [...list.cards, { id: '' + Math.random()*89793113, text: action.payload.text }]
      });
      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
          lists: [
            ...currState.currentBoard.lists.slice(0, index),
            newList,
            ...currState.currentBoard.lists.slice(index+1)
          ]
        })
      });

    case 'EDIT_CARD':
      const list_edit = currState.currentBoard.lists.find(list => list.id === action.payload.listId);
      const index_edit = currState.currentBoard.lists.indexOf(list_edit);
      const card = list_edit.cards.find(card => card.id === action.payload.cardId);
      const indexEditCard = list_edit.cards.indexOf(card);
      const updateEditCard = { id : card.id, text : action.payload.text };

      const newList_edit = Object.assign({}, list_edit, {
        cards: [
          ...list_edit.cards.slice(0, indexEditCard),
          updateEditCard,
          ...list_edit.cards.slice(indexEditCard + 1)
        ]
      });

      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
          lists: [
            ...currState.currentBoard.lists.slice(0, index_edit),
            newList_edit,
            ...currState.currentBoard.lists.slice(index_edit + 1)
          ]
        })
      });

    case 'MOVE_CARD':
      const cards = currState.currentBoard.lists[0].cards;
      const movingList1 = cards[action.payload.fromIndex];
      let arrayAfterRemoving1 = [...cards.splice(0, action.payload.fromIndex), ...cards.slice(action.payload.fromIndex + 1)];
      arrayAfterRemoving1.splice(action.payload.toIndex, 0, movingList1);
      currState.currentBoard.lists[0].cards = arrayAfterRemoving1;

      return currState;

    case 'EDIT_BOARD':
      currState.currentBoard.name = action.payload.name;
      return currState;

    case 'CREATE_LIST':
      const board = currState.currentBoard;

      currState.currentBoard.lists = [...currState.currentBoard.lists, {
          id: '' + Math.random() * 10113,
          name: action.payload.name,
          cards: []
        }];
      return currState;

    case 'MOVE_LIST':
      const flist = currState.currentBoard.lists.find(list => list.id === action.payload.fromId);
      const flindex = currState.currentBoard.lists.indexOf(flist);
      const tlist = currState.currentBoard.lists.find(list => list.id === action.payload.toId);
      const tlindex = currState.currentBoard.lists.indexOf(tlist);
      const items = currState.currentBoard.lists[flindex];

      const afterRemoveList = Object.assign({}, currState.currentBoard, {
        lists: [
          ...currState.currentBoard.lists.slice(0, flindex),
          ...currState.currentBoard.lists.slice(flindex + 1)
        ]
      });

      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
              lists: [
                ...afterRemoveList.lists.slice(0, tlindex),
                items,
                ...afterRemoveList.lists.slice(tlindex)
              ]
          })
      });

    case 'MOVE_CARD':
      const list3 = currState.currentBoard.lists.find(list => list.id === action.payload.listId);
      const lindex = currState.currentBoard.lists.indexOf(list3);
      const fcard = currState.currentBoard.lists[lindex].cards.find(card => card.id === action.payload.fromIndex);
      const fcindex = currState.currentBoard.lists[lindex].cards.indexOf(fcard);
      const tcard = currState.currentBoard.lists[lindex].cards.find(card => card.id === action.payload.toIndex);
      const tcindex = currState.currentBoard.lists[lindex].cards.indexOf(tcard);
      const fromcard = currState.currentBoard.lists[lindex].cards[fcindex];

      const newList3 = Object.assign({}, list3, {
        cards: [ ...list3.cards.slice(0, fcindex),
        ...list3.cards.slice(fcindex+1)]
    });

      const newList4 = Object.assign({}, newList3, {
        cards: [
          ...newList3.cards.slice(0, tcindex),
          fromcard,
          ...newList3.cards.slice(tcindex)
        ]
    });

      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
          lists: [
            ...currState.currentBoard.lists.slice(0, lindex),
            newList4,
            ...currState.currentBoard.lists.slice(lindex + 1)
          ]
        })
      });

    case 'EDIT_LIST':
      const edit_list = currState.currentBoard.lists.find(list => list.id === action.payload.listId);
      const edit_list_index = currState.currentBoard.lists.indexOf(edit_list);
      const updateList = {
        id: edit_list.id,
        name: action.payload.name,
        cards: edit_list.cards
      };

      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
          lists: [
            ...currState.currentBoard.lists.slice(0, edit_list_index),
            updateList,
            ...currState.currentBoard.lists.slice(edit_list_index + 1)
          ]
        })
      });

    case 'SET_CURRENT_BOARD':
      return Object.assign({}, {
        currentBoard: action.payload
      });

    case 'SET_BOARDS_LIST':
      return Object.assign({}, {
        boardsList: action.payload
      });

    default:
      return currState;
  }
}

module.exports = TrelloApp;
