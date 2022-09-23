import { h } from 'preact';
import { Route, Router } from 'preact-router';

// Code-splitting is automated for `routes` directory
import Home from './routes/home';
import GameNew from './routes/game/gameNew';
import GameStart from './routes/game/gameStart';
import GameFinish from './routes/game/gameFinish';
import Question from './routes/game/q/question';

import Error404 from './routes/error/error404';
import GameList from './routes/game/gameList';
import FindPlayer from './routes/findPlayer';
import TestQuestions from './routes/test/testQuestions';

export interface UrlRouteProps {
    gameId: string,
    questionIdx: string
}

const App = () => (
	<main id="app">
        <Router>
            <Route path="/" component={Home} />
            <Route path="/find-player" component={FindPlayer} />
            <Route path="/game/new" component={GameNew} />
            <Route path="/game/:gameId" component={GameStart} />
            <Route path="/game/:gameId/q/:questionIdx" component={Question} />
            <Route path="/game/:gameId/finish" component={GameFinish} />

            <Route path="/games" component={GameList} />

            <Route path="/test/questions" component={TestQuestions} />

            <Route path="/error/404" component={Error404} />
        </Router>
    </main>
);

export default App;
