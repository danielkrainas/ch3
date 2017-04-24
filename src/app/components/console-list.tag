import { selectConsoles, setActiveConsole } from '../store';

<console-list>
	<div class="screen-center">
		<div class="console-list" onkeydown={ handleKeyboard }>
			<section each={ _consoles } class={ 'console-list-item': true, active: active  }>
				<a class="{ icon }" href="#"><b title={ name }></b> <p class="text-8bit console-title">{ name }</p></a>
			</section>
		</div>
	</div>

	<script>
		this.mixin('redux');

		this.dispatchify({ setActiveConsole });

		this.subscribe(state => { _consoles: selectConsoles(state) });

		this.on('update', () => {
			if (this.selected == null || this._consoles.length <= this.selected) {
				this.selected = 0;
			}
		});

		const handleKeyboard = (event) => {
			switch (event.key) {
				default: return;
				case 'ArrowDown':
					this.selected--;
					if (this.selected < 0) {
						this.selected = this._consoles.length - 1;
					}

					this.setActiveConsole(this._consoles[this.selected])
					break;

				case 'ArrowUp':
					this._consoles[this.selected].active = false;
					this.selected++;
					if (this.selected >= this._consoles.length) {
						this.selected = 0;
					}

					this._consoles[this.selected].active = true;
					this.update();
					break;
			};

			const el = this.root.querySelector('.console-list').getElementsByTagName('section')[0];
			if (this.selected <= 0) {
				el.style.marginTop = '0';
				//el.style.transform = 'translate(0%,0%)';
			} else {
				//el.style.transform = 'translate(0%,'+ (100*this.selected) +'%)';
				el.style.marginTop = '-' + (el.clientHeight*this.selected) + 'px';
			}
		};

		this.on('mount', () => {
			const list = this.root.querySelector('.console-list');
			//list.addEventListener('keydown', handleKeyboard);
			list.focus();
		});

		this.on('unmount', () => {
			//const list = this.root.querySelector('.console-list');
			//list.removeEventListener('keydown', handleKeyboard);
		});
	</script>
</console-list>