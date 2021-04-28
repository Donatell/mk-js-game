export class Player {
	hp = 100;

	constructor(props) {
		this.player = props.player;
		this.displayName = props.displayName;
		this.name = props.name;
	}

	changeHP(damage) {
		this.hp -= damage;

		if (this.hp <= 0) {
			this.hp = 0;
		}
	}

	getPlayerHPElements() {
		const $playerHP = document.querySelector(
			`.player${this.player} .progressbar .hp`);
		const $playerHPCount = document.querySelector(
			`.player${this.player} .progressbar .hpcount`);

		return { $playerHP, $playerHPCount };
	}

	renderHP() {
		const { $playerHP, $playerHPCount } = this.getPlayerHPElements();

		$playerHP.style.width = this.hp + '%';
		$playerHPCount.innerText = this.hp;
	}

	getDamage(damage) {
		this.changeHP(damage);
		this.renderHP();
	}

}