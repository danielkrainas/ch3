<console-list>
	<div class="screen-center">
		<div class="console-list">
			<section each={ _consoles } class={ 'console-list-item': true, active: active  }>
				<a class="{ icon }" href="#"><b title={ name }></b> <p class="text-8bit console-title">{ name }</p></a>
			</section>
		</div>
	</div>

	<script>
		this._consoles = [
			{
				name: 'NES',
				icon: 'icon-nes2',//'ci-nes',
				active: true
			},
			{
				name: 'SNES',
				icon: 'icon-snes'//'ci-nes'
			},
		];

		let selected = 0;

		const handleKeyboard = (event) => {
			switch (event.key) {
				case 'ArrowDown':
					this._consoles[selected].active = false;
					selected--;
					if (selected < 0) {
						selected = this._consoles.length - 1;
					}

					this._consoles[selected].active = true;
					this.update();
					break;

				case 'ArrowUp':
					this._consoles[selected].active = false;
					selected++;
					if (selected >= this._consoles.length) {
						selected = 0;
					}

					this._consoles[selected].active = true;
					this.update();
					break;
			};

			const el = this.root.querySelector('.console-list').getElementsByTagName('section')[0];
			if (selected <= 0) {
				el.style.marginTop = '0';
				//el.style.transform = 'translate(0%,0%)';
			} else {
				//el.style.transform = 'translate(0%,'+ (100*selected) +'%)';
				el.style.marginTop = '-' + (el.clientHeight*selected) + 'px';
			}
		};

		this.on('mount', () => {
			const list = this.root.querySelector('.console-list');
			list.addEventListener('keydown', handleKeyboard);
			list.focus();
		});

		this.on('unmount', () => {
			const list = this.root.querySelector('.console-list');
			list.removeEventListener('keydown', handleKeyboard);
		});
	</script>
</console-list>