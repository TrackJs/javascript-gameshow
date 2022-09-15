import { h } from 'preact';
import { Route, Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Profile from '../routes/profile';

import NewGame from '../routes/game/new';
import GameBoard from '../routes/game/board';

const App = () => (
	<main id="app">
        <Router>
            <Route path="/" component={Home} />
            <Route path="/profile/" component={Profile} user="me" />
            <Route path="/profile/:user" component={Profile} />

            <Route path="/game/new" component={NewGame} />
            <Route path="/game/:gameId" component={GameBoard} />
        </Router>
    </main>
);

export default App;
