import {
	$player1Button, $player2Button, $randomButton, populateArena
} from './src/functions.js';
import { player1, player2 } from './src/players.js';

populateArena(player1, player2);

$randomButton.addEventListener('click', () => {
	const targetPlayerNumber = Math.floor(Math.random() * 2) + 1;
	const damage = Math.floor(Math.random() * 20) + 1;

	const player = targetPlayerNumber === 1 ? player1 : player2;

	player.getDamage(damage);
});

$player1Button.addEventListener('click', () => {
	const damage = Math.floor(Math.random() * 20) + 1;

	player1.dealDamage(damage);
});

$player2Button.addEventListener('click', () => {
	const damage = Math.floor(Math.random() * 20) + 1;

	player2.dealDamage(damage);
});