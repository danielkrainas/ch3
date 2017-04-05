<console-list>
	<div class="screen-center">
		<ul class="console-list">
			<li each={ _consoles } class={ 'console-list-item': true, active: active  }>
				<a href="#"><b class="ci-icon { icon }" title={ name }></b> <p class="text-8bit console-title">{ name }</p></a>
			</li>
		</ul>
	</div>

	<script>
		this._consoles = [
			{
				name: 'NES',
				icon: 'ci-nes',
				active: true
			},
			{
				name: 'NES',
				icon: 'ci-nes'
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

			const el = this.root.getElementsByTagName('UL')[0].getElementsByTagName('LI')[0];
			if (selected <= 0) {
				el.style.marginTop = '0';
			} else {
				el.style.marginTop = '-' + (100*selected) + '%';
			}
		};

		this.on('mount', () => {
			const list = this.root.getElementsByTagName('UL')[0];
			list.addEventListener('keydown', handleKeyboard);
			list.focus();
		});

		this.on('unmount', () => {
			const list = this.root.getElementsByTagName('UL')[0];
			list.removeEventListener('keydown', handleKeyboard);
		});
	</script>
</console-list>