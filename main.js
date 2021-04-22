import { $fightForm, fight, populateArena } from './src/arena.js';
import { generateFightLog } from './src/logs.js';
import { Player } from './src/players.js';

export const player1 = new Player({
	player: 1,
	displayName: 'Sub-Zero',
	name: 'subzero'
});

export const player2 = new Player({
	player: 2,
	displayName: 'Scorpion',
	name: 'scorpion'
});

populateArena(player1, player2);

generateFightLog('start', player1, player2);

$fightForm.addEventListener('submit', (e) => {
	e.preventDefault();
	fight();
});