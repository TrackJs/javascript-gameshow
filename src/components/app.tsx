import { h } from 'preact';
import { Route, Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Profile from '../routes/profile';

import NewGame from '../routes/game/new';
import GameStart from '../routes/game/gameStart';
import QuestionStart from '../routes/game/q/questionStart';

import Error404 from '../routes/error/error404';

const App = () => (
	<main id="app">
        <Router>
            <Route path="/" component={Home} />
            <Route path="/profile/" component={Profile} user="me" />
            <Route path="/profile/:user" component={Profile} />

            <Route path="/game/new" component={NewGame} />
            <Route path="/game/:gameId" component={GameStart} />
            <Route path="/game/:gameId/q/:questionId" component={QuestionStart} />

            <Route path="/error/404" component={Error404} />
        </Router>
    </main>
);

export interface UrlRouteProps {
    gameId: string|undefined,
    questionId: string|undefined
}

export default App;
