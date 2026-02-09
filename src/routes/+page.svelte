<script lang="ts">
	import Clock from '$lib/components/Clock.svelte';
	import Search from '$lib/components/Search.svelte';
	import Favourites from '$lib/components/Favourites.svelte';
	import type { FavouriteLink, SearchEngine, Settings } from '$lib/types';
	import { getSettings } from '$lib/storage';

	const settings: Settings = getSettings();
	const clockFormat: string = settings.clockFormat;
	const favourites: FavouriteLink[] = settings.favourites;
	const searchEngines: SearchEngine[] = settings.searchEngines;
</script>

<svelte:head>
	<title>meowdash</title>
</svelte:head>

<main
	class="flex min-h-[100dvh] flex-col items-center bg-linear-to-r from-indigo-900 to-purple-800"
>
	<div class="flex flex-1 flex-col items-center justify-center gap-10">
		<Clock format={clockFormat} />

		<Favourites favList={favourites} />
	</div>

	<div class="mx-auto w-full max-w-2xl px-4 pb-10">
		<Search {searchEngines} />
	</div>
</main>
