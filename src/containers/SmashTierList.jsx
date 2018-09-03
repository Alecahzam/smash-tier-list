import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import gamesData from '../games-data';
import { addGame, filterByName } from '../redux/game/actions';
import { prevGame, nextGame } from '../redux/app/actions';
import { currentGameSelector } from '../redux/app/selectors';

import Header from '../components/layout/Header';
import Main from '../components/layout/Main';
import Footer from '../components/layout/Footer';

import GameSelect from '../components/GameSelect';

import Game from './Game';

class SmashTierList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    // add all the games to the redux store
    gamesData.forEach((game, id) => dispatch(addGame({ id, ...game })));
  }

  onClickPrev = () => {
    const { dispatch, currentFilter } = this.props;
    dispatch(prevGame());
    dispatch(filterByName(currentFilter));
  }

  onClickNext = () => {
    const { dispatch, currentFilter } = this.props;
    dispatch(nextGame());
    dispatch(filterByName(currentFilter));
  }

  render() {
    const { title, currentGame } = this.props;

    return (
      <div>
        <Header>
          <h1>{title}</h1>
          <GameSelect
            gameTitle={currentGame ? currentGame.shortName : ''}
            onClickPrev={this.onClickPrev}
            onClickNext={this.onClickNext}
          />
        </Header>
        <Main>
          {currentGame ? <Game /> : ''}
        </Main>
        <Footer>
          Made with
          <span role="img" aria-label="love">💙</span>
          by desko27
        </Footer>
      </div>
    );
  }
}

SmashTierList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  currentGame: PropTypes.object.isRequired, // eslint-disable-line
  currentFilter: PropTypes.string.isRequired,
};

export default connect(
  state => ({
    title: state.title,
    currentGame: currentGameSelector(state),
    currentFilter: state.currentFilter,
  }),
)(SmashTierList);