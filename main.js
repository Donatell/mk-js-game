import { $fightForm, fight, populateArena } from './src/functions.js';
import { generateFightLog } from './src/logs.js';
import { player1, player2 } from './src/players.js';

populateArena(player1, player2);

generateFightLog('start', player1, player2);

$fightForm.addEventListener('submit', (e) => {
	e.preventDefault();
	fight();
});

// $randomButton.addEventListener('click', () => {
// 	const targetPlayerNumber = Math.floor(Math.random() * 2) + 1;
// 	const damage = Math.floor(Math.random() * 20) + 1;
//
// 	const player = targetPlayerNumber === 1 ? player1 : player2;
//
// 	player.getDamage(damage);
// });