<script lang="ts">
	import { onMount } from 'svelte';

	let { format }: { format: string } = $props();

	function padDate(n: number): string {
		if (n < 10) {
			return '0' + n;
		} else {
			return n.toString();
		}
	}
	const tokenMap: Record<string, (d: Date) => string> = {
		Y: (d) => padDate(d.getFullYear()),
		M: (d) => padDate(d.getMonth() + 1),
		d: (d) => padDate(d.getDate()),
		H: (d) => padDate(d.getHours()),
		m: (d) => padDate(d.getMinutes()),
		s: (d) => padDate(d.getSeconds())
	};

	const sequence = format.split('').map((c) => tokenMap[c] ?? (() => c));

	let date = $state(new Date());
	let display = $derived.by(() => {
		return sequence
			.map((fn) => fn(date))
			.join('')
			.split(' ');
	});

	onMount(() => {
		const interval = setInterval(() => {
			date = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
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
