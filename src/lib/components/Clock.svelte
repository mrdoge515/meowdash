<script lang="ts">
	import { onMount } from 'svelte';

	// https://docs.oracle.com/javase/6/docs/api/java/text/SimpleDateFormat.html
	const { format }: { format: string } = $props();

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

<div class="card-glass flex aspect-video flex-col items-center justify-center p-4">
	<h1 class="text-7xl text-white text-shadow-lg">
		{display[0]}
	</h1>
	<h2 class="text-xl text-gray-200 text-shadow-md">{display[1]}</h2>
</div>
