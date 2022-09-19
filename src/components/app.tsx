import { h } from 'preact';
import { Route, Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Profile from '../routes/profile';

import NewGame from '../routes/game/new';
import GameStart from '../routes/game/gameStart';
import GameFinish from '../routes/game/gameFinish';
import QuestionStart from '../routes/game/q/questionStart';
import QuestionShow from '../routes/game/q/questionShow';
import QuestionResult from '../routes/game/q/questionResult';

import Error404 from '../routes/error/error404';

const App = () => (
	<main id="app">
        <Router>
            <Route path="/" component={Home} />
            <Route path="/profile/" component={Profile} user="me" />
            <Route path="/profile/:user" component={Profile} />

            <Route path="/game/new" component={NewGame} />
            <Route path="/game/:gameId" component={GameStart} />
            <Route path="/game/:gameId/q/:questionIdx" component={QuestionStart} />
            <Route path="/game/:gameId/q/:questionIdx/show" component={QuestionShow} />
            <Route path="/game/:gameId/q/:questionIdx/result" component={QuestionResult} />
            <Route path="/game/:gameId/finish" component={GameFinish} />

            <Route path="/error/404" component={Error404} />
        </Router>
    </main>
);

export interface UrlRouteProps {
    gameId: string,
    questionIdx: string
}

export default App;
