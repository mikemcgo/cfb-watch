import React from 'react'
import games from './games.js'
import teams from './teams.js'

class Team extends React.Component {
  render() {
    let img = null
    if (Array.isArray(this.props.team.logos)) {
      img = <img src={this.props.team.logos[0]} alt="" style={{
        'objectFit': 'contain',
        'height': '90%',
        'width': '90%',
      }} />
    }
    return <div style={{
      backgroundColor: this.props.team.alt_color,
      height: '200px',
      'textAlign': 'center',
      'alignContent': 'center',
      'width': '100%'
    }}>
      <span>{this.props.team.school} - {this.props.team.mascot}</span>
      {img}
    </div>
  };
}

class Game extends React.Component {
  render() {
    return <div style={{
      'display': 'flex',
      'width': '100%',
    }}>
      <Team team={this.props.home_team} score='asdf' />
      <div style={{
        width: '20%',
        textAlign: 'center',
        margin: 'auto'
      }}>{this.props.game.home_points} - {this.props.game.away_points} </div>
      <Team team={this.props.away_team} score='asdf' />
    </div>
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      games: []
    };
  }

  componentDidMount() {
    this.load(false)
  }

  load(live) {
    if (live) {
      fetch("https://api.collegefootballdata.com/teams")
        .then(res => res.json())
        .then(result => this.setState({ teams: result }))
      fetch("https://api.collegefootballdata.com/games?year=2020&seasonType=postseason")
        .then(res => res.json())
        .then(result => this.setState({ games: result }))
    } else {
      this.setState({ teams: this.index('id', teams), games: games })
    }
  }

  index(varName, data) {
    return Object.assign({}, ...data.map((x) => ({ [x[varName]]: x })))
  }

  render() {
    const listItems = this.state.games.map((game) =>
      <Game home_team={this.state.teams[game.home_id]} away_team={this.state.teams[game.away_id]} game={game} />
    );
    return <ul style={{
      'listStyle': null,
      'padding': '0%',
      'verticalAlign': 'top'
    }}>{listItems}</ul>
  };
}

export default App;
