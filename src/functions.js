const createElement = (tag, className, innerText) => {
	const $tag = document.createElement(tag);

	if (className) {
		$tag.classList.add(className);
	}

	if (innerText) {
		$tag.innerText = innerText;
	}

	return $tag;
};

const createPlayer = (player) => {
	const $player = createElement('div', 'player' + player.player);
	const $progressBar = createElement('div', 'progressbar');

	const $life = createElement('div', 'life', player.hp);
	$life.style.width = '100%';

	const $name = createElement('div', 'name',
		player.displayName.toUpperCase());

	const $character = createElement('div', 'character');

	const $image = createElement('img');
	$image.src =
		`http://reactmarathon-api.herokuapp.com/assets/${player.name}.gif`;

	$progressBar.appendChild($life);
	$progressBar.appendChild($name);

	$character.appendChild($image);

	$player.appendChild($progressBar);
	$player.appendChild($character);

	return $player;
};

const populateArena = (player1, player2) => {

	const $player1 = createPlayer(player1);
	const $player2 = createPlayer(player2);

	const $arenas = document.querySelector('.arenas');
	$arenas.appendChild($player1);
	$arenas.appendChild($player2);

	console.log('populated');
};

export {
	populateArena
};