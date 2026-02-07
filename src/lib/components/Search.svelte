<script lang="ts">
	import type { SearchEngine } from '$lib/types';
	import { enhance } from '$app/forms';

	const { searchEngines }: { searchEngines: SearchEngine[] } = $props();

	let query = $state('');
</script>

<form
	method="POST"
	use:enhance={({ formData, cancel }) => {
		cancel();

		const queryValue = formData.get('query');
		if (!queryValue || typeof queryValue !== 'string') return;
		let query: string = queryValue.trim();
		let defaultEngine: SearchEngine | undefined = undefined;

		for (const el of searchEngines) {
			if (query.startsWith(el.shortcut)) {
				query = query.replace(el.shortcut, '');
				window.location.href = el.searchUrl.toString() + query.trim();
				return;
			}
			if (el.default) {
				defaultEngine = el;
			}
		}

		if (defaultEngine) {
			window.location.href = defaultEngine.searchUrl.toString() + query;
			return;
		}

		if (searchEngines.length > 0) {
			window.location.href = searchEngines[0].searchUrl.toString() + query;
		}
	}}
>
	<input
		class="isolate aspect-video h-16 items-center justify-center rounded-xl bg-black/20 pr-4 pl-4 text-xl text-gray-200 shadow-lg ring-1 ring-black/5 transition-colors ease-in focus:border-purple-500"
		type="search"
		name="query"
		placeholder="Search..."
		value={query}
	/>
</form>
