import { $randomButton, changeHP, populateArena } from './src/functions.js';
import { player1, player2 } from './src/players.js';

populateArena(player1, player2);

$randomButton.addEventListener('click', () => {
	const targetPlayerNumber = Math.floor(Math.random() * 2) + 1;

	const player = targetPlayerNumber === 1 ? player1 : player2;
	changeHP(player);
});