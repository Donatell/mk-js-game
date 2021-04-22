export const TARGET = ['head', 'body', 'legs'];

export const TARGET_DAMAGE = {
	head: 30,
	body: 25,
	legs: 20
};

export const getRandom = max => Math.floor(Math.random() * max) + 1;

export const getRandomIndex = max => Math.floor(Math.random() * max);