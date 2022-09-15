import { h } from 'preact';
import style from './style.css';

const Home = () => (
	<div class={style.home}>
		<h1>Hello World!</h1>
		<p>This is the Home component.</p>
		<a href="/game/new">Start a new game</a>
	</div>
);

export default Home;
