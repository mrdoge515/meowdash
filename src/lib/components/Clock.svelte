<script lang="ts">
	import { onMount } from 'svelte';

	// {time} {date}
	let { format }: { format: string } = $props();

	let date = $state(new Date());
	let display = $derived.by(() => {
		let clock = '';

		for (let i = 0; i < format.length; i++) {
			switch (format.charAt(i)) {
				case 'Y':
					clock += padDate(date.getFullYear());
					break;
				case 'M':
					clock += padDate(date.getMonth() + 1);
					break;
				case 'd':
					clock += padDate(date.getDate());
					break;
				case 'H':
					clock += padDate(date.getHours());
					break;
				case 'm':
					clock += padDate(date.getMinutes());
					break;
				case 's':
					clock += padDate(date.getSeconds());
					break;
				default:
					clock += format.charAt(i);
			}
		}

		return clock.split(' ');
	});

	onMount(() => {
		const interval = setInterval(() => {
			date = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

	function padDate(n: number): string {
		if (n < 10) {
			return '0' + n;
		} else {
			return n.toString();
		}
	}
</script>

<div
	class="isolate flex aspect-video flex-col items-center justify-center rounded-xl bg-black/20 p-4 shadow-lg ring-1 ring-black/5"
>
	<h1
		class="text-7xl text-white text-shadow-lg
"
	>
		{display[0]}
	</h1>
	<h2 class="text-xl text-gray-200 text-shadow-md">{display[1]}</h2>
</div>
