import { $fightForm, attack, populateArena } from './src/functions.js';
import { player1, player2 } from './src/players.js';

populateArena(player1, player2);

$fightForm.addEventListener('submit', (e) => {
	e.preventDefault();
	attack($fightForm);
});

// $randomButton.addEventListener('click', () => {
// 	const targetPlayerNumber = Math.floor(Math.random() * 2) + 1;
// 	const damage = Math.floor(Math.random() * 20) + 1;
//
// 	const player = targetPlayerNumber === 1 ? player1 : player2;
//
// 	player.getDamage(damage);
// });