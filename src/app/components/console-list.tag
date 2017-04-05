<console-list>
	<div class="screen-center">
		<p class="text-8bit">NES</p>
		<ul class="console-list">
			<li each={_consoles } class="console-list-item"><a href="#"><b class="ci-icon { icon }" title={ name }></b></a></li>
		</ul>
	</div>

	<script>
		this._consoles = [
			{
				name: 'NES',
				icon: 'ci-nes'
			},
			{
				name: 'NES',
				icon: 'ci-nes'
			},
		];

	</script>
</console-list>