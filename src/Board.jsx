import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import List from './List';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';

const styles = {
  flexContainer: {
    display: 'flex',
    color: 'blue'
  },
  flexItem: {
    width: '300px',
    height: '75px',
    padding: '0.5em'
  }
}

class Board extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    currentBoard: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      addingList: false,
      addListTitle: ''
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_CURRENT_BOARD',
      boardId: this.props.id
    })
  }

  handleCreateList(event) {
    event.preventDefault();
    const newList = {
      id: Math.random()*879979224,
      name: this.state.addListTitle,
      cards: []
    };

    const lists = [...this.props.currentBoard.lists, newList];
    this.setState({id:this.props.currentBoard.id});
    this.setState({name:this.props.currentBoard.name});

    this.setState({lists, addListTitle: ''});
    this.props.currentBoard.lists = lists;
    this.saveBoard();
  }

  handleListUpdate(listId, newValue) {
    const index = this.props.currentBoard.lists.findIndex(list => list.id === listId);
    const list = this.props.currentBoard.lists[index];
    const newList = Object.assign({}, list, {name: newValue});
    const lists = [...this.props.currentBoard.lists.slice(0, index), newList, ...this.props.currentBoard.lists.slice(index+1)];

    this.setState({lists});
    this.setState({id:this.props.currentBoard.id});
    this.setState({name:this.props.currentBoard.name});

    this.props.currentBoard.lists = lists;
    this.saveBoard();
  }

  handleCreateCard(listId, cardText) {
    const index = this.props.currentBoard.lists.findIndex(list => list.id === listId);
    const list = this.props.currentBoard.lists[index];
    const cards = [...list.cards, {id: Math.random()*879792374, text: cardText}]
    const currentBoard = {};
    const newList = Object.assign({}, list, {cards});

    const lists = [...this.props.currentBoard.lists.slice(0, index), newList, ...this.props.currentBoard.lists.slice(index+1)];
    this.setState({lists});
    this.setState({id:this.props.currentBoard.id});
    this.setState({name:this.props.currentBoard.name});

    this.props.currentBoard.lists = lists;
    this.saveBoard();
  }

  handleCardUpdate(listId, cardId, newValue) {
    const listIndex = this.props.currentBoard.lists.findIndex(list => list.id === listId);
    const list = this.props.currentBoard.lists[listIndex];
    const cardIndex = list.cards.findIndex(card => card.id === cardId);
    const card = list.cards[cardIndex];

    console.log('listIndex:', listIndex);
    console.log('cardIndex:', cardIndex);

    const updatedCards = [...list.cards.slice(0, cardIndex), {id: cardId, text: newValue}, ...list.cards.slice(cardIndex+1)];
    const updatedList = Object.assign({}, list, {cards: updatedCards});

    const lists = [...this.props.currentBoard.lists.slice(0, listIndex), updatedList, ...this.props.currentBoard.lists.slice(listIndex+1)];
    this.setState({lists});
    this.setState({id:this.props.currentBoard.id});
    this.setState({name:this.props.currentBoard.name});

    this.props.currentBoard.lists = lists;
    this.saveBoard();
  }

  saveBoard() {
    setTimeout(() => {
      const {id, name, lists} = this.state;
      axios.put(`/api/board/${id}`, {id, name, lists}).then(result => console.log('Updated State'));
    });
  }

  handleAddListBlur() {
    this.setState({addingList: false});
  }

  handleAddListButton() {
    this.setState({addingList: true});
  }

  handleTitleChange(event) {
    this.setState({addListTitle: event.target.value});
  }

  render() {
    const currentBoard = this.props.currentBoard || {'lists': []};

    return (
      <Fragment>
        <div style={styles.flexContainer}>
          {currentBoard.lists.map(list => (
            <List
              styles={styles.flexItem}
              key={list.id}
              data={list}
              onCreateCard={this.handleCreateCard.bind(this, list.id)}
              onCardUpdate={this.handleCardUpdate.bind(this, list.id)}
              onListUpdate={this.handleListUpdate.bind(this, list.id)}
            />
          ))}

          {this.state.addingList ? (
            <form onSubmit={this.handleCreateList.bind(this)}>
              <TextField
                style={styles.flexItem}
                autoFocus
                fullWidth
                value={this.state.addListTitle}
                onChange={this.handleTitleChange.bind(this)}
                onBlur={this.handleAddListBlur.bind(this)}
                placeholder="List Name"
              />
            </form>
          ) : (
            <Button
              color="secondary"
              fullWidth
              style={styles.flexItem}
              onClick={this.handleAddListButton.bind(this)}
            >
              New List
            </Button>
          )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  currentBoard: state.currentBoard
});

export default connect(mapStateToProps) (Board);
