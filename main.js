import { Game } from './src/game.js';

const game = new Game();

game.start();

game.$fightForm.addEventListener('submit', (e) => {
	e.preventDefault();
	game.fight();
});