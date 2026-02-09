<script lang="ts">
	import type { FavouriteLink } from '$lib/types';

	let { favList }: { favList: FavouriteLink[] } = $props();

	if (typeof window !== 'undefined') {
		// stash the value...
		const initial = favList;

		// unset it...
		favList = undefined;

		$effect(() => {
			// ...and reset after we've mounted
			favList = initial;
		});
	}
</script>

<div class="card-glass flex items-center justify-center p-4">
	{#each favList as fav (fav.name)}
		<a
			class="flex flex-col items-center justify-center px-2 text-xl text-slate-200 transition-colors ease-in text-shadow-md hover:text-purple-600"
			href={fav.url}
			target="_blank"
			rel="external noopener noreferrer"
		>
			{#if fav.iconUrl}
				<img class="w-10" alt="{fav.name}'s logo" src={fav.iconUrl} />
			{/if}
			{fav.name}</a
		>
	{/each}
</div>
