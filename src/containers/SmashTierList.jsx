import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { Wrapper } from './SmashTierList.styles';

import gamesData from '../games-data';
import { addGame, filterByName } from '../redux/game/actions';
import { prevGame, nextGame } from '../redux/app/actions';
import { currentGameSelector } from '../redux/app/selectors';

import Header from '../components/layout/Header';
import { InnerHeaderSecondLine, OuterHeaderSecondLine } from '../components/layout/Header.styles';
import Main from '../components/layout/Main';
import Footer from '../components/layout/Footer';

import SuperTitle from '../components/SuperTitle';
import GameSelect from '../components/GameSelect';
import Filter from '../components/Filter';
import HeaderIcon from '../components/HeaderIcon';

import Game from './Game';

class SmashTierList extends React.Component {
  constructor(props) {
    super();
    const { dispatch } = props;

    // add all the games to the redux store
    gamesData.forEach(game => dispatch(addGame(game)));
  }

  onFilterChange = (e) => {
    const { dispatch } = this.props;
    dispatch(filterByName(e.target.value));
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
    const { currentGame } = this.props;

    const HeaderSecondLine = TheWrapper => (
      <TheWrapper>
        <Filter onChange={this.onFilterChange} />
        <HeaderIcon
          svgPath="/svg/book.svg"
          alt="Smash Wiki"
          url="https://www.ssbwiki.com/tier_list"
        />
        <HeaderIcon
          svgPath="/svg/github.svg"
          alt="Soruce on GitHub"
          url="https://github.com/desko27/smash-tier-list"
        />
      </TheWrapper>
    );

    return (
      <Wrapper>
        <Header>
          <SuperTitle>Super Smash Bros.</SuperTitle>
          <GameSelect
            gameTitle={currentGame ? currentGame.shortName : ''}
            onClickPrev={this.onClickPrev}
            onClickNext={this.onClickNext}
          />
          {HeaderSecondLine(InnerHeaderSecondLine)}
        </Header>
        {HeaderSecondLine(OuterHeaderSecondLine)}
        <Main>
          <Game />
        </Main>
        <Footer>
          Made with
          <span role="img" aria-label="love">💙</span>
          by desko27
        </Footer>
      </Wrapper>
    );
  }
}

SmashTierList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentGame: PropTypes.object.isRequired,
  currentFilter: PropTypes.string.isRequired,
};

export default connect(
  state => ({
    title: state.title,
    currentGame: currentGameSelector(state),
    currentFilter: state.currentFilter,
  }),
)(SmashTierList);
