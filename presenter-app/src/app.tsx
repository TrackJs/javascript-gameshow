import { h } from 'preact';
import { Route, Router } from 'preact-router';

// Code-splitting is automated for `routes` directory
import Home from './routes/home';
import GameNew from './routes/game/gameNew';
import GameDetails from './routes/game/gameDetails';
import QuestionDetails from './routes/game/q/questionDetails';
import GameList from './routes/game/gameList';
import FindPlayer from './routes/findPlayer';
import TestQuestions from './routes/test/testQuestions';
import ErrorNotFound from './routes/error/errorNotFound';
import TestPrizes from './routes/test/testPrizes';
import VideoBackground from './components/videoBackground';

export interface UrlRouteProps {
    gameId: string,
    questionIdx: string
}

const App = () => (
	<main id="app">
        <Router>
            <Route path="/" component={Home} />
            <Route path="/find-player" component={FindPlayer} />

            <Route path="/games" component={GameList} />
            <Route path="/game/new" component={GameNew} />
            <Route path="/game/:gameId" component={GameDetails} />
            <Route path="/game/:gameId/q/:questionIdx" component={QuestionDetails} />

            <Route path="/test/questions" component={TestQuestions} />
            <Route path="/test/prizes" component={TestPrizes} />

            <Route default component={ErrorNotFound} />
        </Router>
        <VideoBackground />
    </main>
);

export default App;
