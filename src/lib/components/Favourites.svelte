<script lang="ts">
	import type { FavouriteLink } from '$lib/types';

	const { favList }: { favList: FavouriteLink[] } = $props();
</script>

<div
	class="isolate flex items-center justify-center rounded-xl bg-black/20 p-4 shadow-lg ring-1 ring-black/5"
>
	{#each favList as fav (fav.name)}
		<a
			class="flex flex-col items-center justify-center pr-2 pl-2 text-xl text-slate-200 transition-colors ease-in text-shadow-md hover:text-purple-600"
			href={fav.url.href}
			target="_blank"
		>
			{#if fav.iconUrl}
				<img class="w-10" alt="{fav.name}'s logo" src={fav.iconUrl} />
			{/if}
			{fav.name}</a
		>
	{/each}
</div>
