<script lang="ts">
	import Clock from '$lib/components/Clock.svelte';
	import Search from '$lib/components/Search.svelte';
	import Favourites from '$lib/components/Favourites.svelte';
	import type { FavouriteLink, SearchEngine } from '$lib/types';

	const favList: FavouriteLink[] = [
		{
			url: new URL('https://google.com/'),
			name: 'Google',
			iconUrl: 'https:////www.gstatic.com/images/branding/searchlogo/ico/favicon.ico'
		},
		{
			url: new URL('https://github.com/mrdoge515/meowdash'),
			name: 'meowdash',
			iconUrl: 'https://github.githubassets.com/favicons/favicon-dark.svg'
		}
	];

	const searchEngines: SearchEngine[] = [
		{
			name: 'Google',
			searchUrl: new URL('https://google.com/search?q='),
			shortcut: '!g'
		},
		{
			name: 'DuckDuckGo',
			searchUrl: new URL('https://duckduckgo.com/search?q='),
			shortcut: '!d',
			default: true
		}
	];
</script>

<svelte:head>
	<title>meowdash</title>
</svelte:head>

<main class="flex min-h-screen flex-col items-center bg-linear-to-r from-indigo-900 to-purple-800">
	<div class="flex flex-1 flex-col items-center justify-center gap-10">
		<Clock format="H:m:s d/M/Y" />

		<Favourites {favList} />
	</div>

	<div class="mx-auto w-full max-w-2xl px-4 pb-10">
		<Search {searchEngines} />
	</div>
</main>
