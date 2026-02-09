<script lang="ts">
	import type { FavouriteLink, SearchEngine, Settings } from '$lib/types';
	import { saveSettings, getSettings } from '$lib/storage';

	let settings: Settings = $state({ clockFormat: '', favourites: [], searchEngines: [] });
	let newFav: FavouriteLink = $state({ name: '', url: '', iconUrl: '' });
	let newEngine: SearchEngine = $state({ name: '', searchUrl: '', shortcut: '', default: false });

	function addNewFav() {
		settings.favourites.push({ ...newFav });
		newFav = { name: '', url: '', iconUrl: '' };
	}

	function addNewEngine() {
		settings.searchEngines.push({ ...newEngine });
		newEngine = { name: '', searchUrl: '', shortcut: '', default: false };
	}

	function save(): void {
		saveSettings(settings);
	}
</script>

<svelte:head>
	<title>Settings</title>
</svelte:head>

<main
	class="flex min-h-screen flex-col items-center bg-linear-to-r from-indigo-900 to-purple-800 p-4"
>
	<div class="w-full max-w-4xl space-y-8 py-8">
		<h1 class="text-center text-5xl font-bold text-white text-shadow-lg sm:text-7xl">Settings</h1>

		<!-- Clock Settings Section -->
		<section class="card-glass space-y-4 p-6 sm:p-8">
			<h2 class="text-3xl font-semibold text-white text-shadow-lg sm:text-4xl">Clock</h2>
			<div class="space-y-2">
				<label for="clockFormat" class="block text-lg text-gray-200 sm:text-xl">
					Clock format. See
					<a
						href="https://docs.oracle.com/javase/6/docs/api/java/text/SimpleDateFormat.html"
						target="_blank"
						class="text-purple-300 underline transition-colors hover:text-purple-400"
					>
						here
					</a>
					for more info.
				</label>
				<input
					class="card-glass h-12 w-full px-4 text-lg text-gray-200 transition-colors ease-in focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none sm:h-16 sm:text-xl"
					id="clockFormat"
					type="text"
					placeholder="e.g., HH:mm:ss"
					bind:value={settings.clockFormat}
				/>
			</div>
		</section>

		<!-- Favourites Section -->
		<section class="card-glass space-y-4 p-6 sm:p-8">
			<h2 class="text-3xl font-semibold text-white text-shadow-lg sm:text-4xl">Favourites</h2>

			<div class="space-y-4">
				<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					<!-- Name Input -->
					<div class="space-y-2">
						<label for="favName" class="block text-sm font-medium text-gray-200 sm:text-base">
							Name
						</label>
						<input
							class="card-glass h-12 w-full px-4 text-base text-gray-200 transition-colors ease-in focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
							id="favName"
							type="text"
							placeholder="GitHub"
							bind:value={newFav.name}
						/>
					</div>

					<!-- URL Input -->
					<div class="space-y-2">
						<label for="favUrl" class="block text-sm font-medium text-gray-200 sm:text-base">
							URL
						</label>
						<input
							class="card-glass h-12 w-full px-4 text-base text-gray-200 transition-colors ease-in focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
							id="favUrl"
							type="url"
							placeholder="https://github.com"
							bind:value={newFav.url}
						/>
					</div>

					<!-- Icon URL Input -->
					<div class="space-y-2">
						<label for="favIcon" class="block text-sm font-medium text-gray-200 sm:text-base">
							Icon URL
						</label>
						<input
							class="card-glass h-12 w-full px-4 text-base text-gray-200 transition-colors ease-in focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
							id="favIcon"
							type="url"
							placeholder="https://example.com/icon.png"
							bind:value={newFav.iconUrl}
						/>
					</div>
				</div>

				<!-- Add Button -->
				<button
					class="card-glass h-12 w-full px-6 text-base font-semibold text-white transition-all ease-in hover:scale-[1.02] hover:bg-purple-600/30 active:scale-[0.98] sm:w-auto"
					type="button"
					onclick={addNewFav}
				>
					Add Favourite
				</button>
			</div>

			<!-- Favourites List -->
			{#if settings.favourites.length > 0}
				<div class="mt-6 space-y-3">
					<h3 class="text-xl font-medium text-gray-200">Current Favourites</h3>
					<div class="space-y-2">
						{#each settings.favourites as fav, index (fav.name)}
							<div
								class="card-glass flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between"
							>
								<div class="flex items-center gap-3">
									{#if fav.iconUrl}
										<img class="h-8 w-8 rounded" alt="{fav.name}'s logo" src={fav.iconUrl} />
									{/if}
									<div class="flex flex-col">
										<span class="text-lg font-medium text-white">{fav.name}</span>
										<span class="text-sm text-gray-300">{fav.url}</span>
									</div>
								</div>
								<button
									class="card-glass h-10 px-4 text-sm font-medium text-red-300 transition-colors hover:bg-red-600/30 hover:text-red-200"
									type="button"
									onclick={() => {
										settings.favourites = settings.favourites.filter((_, i) => i !== index);
									}}
								>
									Remove
								</button>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</section>

		<!-- Search Engines Section -->
		<section class="card-glass space-y-4 p-6 sm:p-8">
			<h2 class="text-3xl font-semibold text-white text-shadow-lg sm:text-4xl">Search Engines</h2>

			<div class="space-y-4">
				<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					<!-- Name Input -->
					<div class="space-y-2">
						<label for="engineName" class="block text-sm font-medium text-gray-200 sm:text-base">
							Name
						</label>
						<input
							class="card-glass h-12 w-full px-4 text-base text-gray-200 transition-colors ease-in focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
							id="engineName"
							type="text"
							placeholder="Google"
							bind:value={newEngine.name}
						/>
					</div>

					<!-- Search URL Input -->
					<div class="space-y-2">
						<label for="engineUrl" class="block text-sm font-medium text-gray-200 sm:text-base">
							Search URL
						</label>
						<input
							class="card-glass h-12 w-full px-4 text-base text-gray-200 transition-colors ease-in focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
							id="engineUrl"
							type="url"
							placeholder="https://google.com/search?q="
							bind:value={newEngine.searchUrl}
						/>
					</div>

					<!-- Shortcut Input -->
					<div class="space-y-2">
						<label
							for="engineShortcut"
							class="block text-sm font-medium text-gray-200 sm:text-base"
						>
							Shortcut
						</label>
						<input
							class="card-glass h-12 w-full px-4 text-base text-gray-200 transition-colors ease-in focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
							id="engineShortcut"
							type="text"
							placeholder="!g"
							bind:value={newEngine.shortcut}
						/>
					</div>

					<!-- Default Checkbox -->
					<div class="space-y-2">
						<label for="engineDefault" class="block text-sm font-medium text-gray-200 sm:text-base">
							Default
						</label>
						<div class="flex h-12 items-center">
							<input
								class="h-5 w-5 rounded border-gray-300 bg-gray-700 text-purple-600 focus:ring-2 focus:ring-purple-500"
								id="engineDefault"
								type="checkbox"
								bind:checked={newEngine.default}
							/>
						</div>
					</div>
				</div>

				<!-- Add Button -->
				<button
					class="card-glass h-12 w-full px-6 text-base font-semibold text-white transition-all ease-in hover:scale-[1.02] hover:bg-purple-600/30 active:scale-[0.98] sm:w-auto"
					type="button"
					onclick={addNewEngine}
				>
					Add Search Engine
				</button>
			</div>

			<!-- Search Engines List -->
			{#if settings.searchEngines.length > 0}
				<div class="mt-6 space-y-3">
					<h3 class="text-xl font-medium text-gray-200">Current Search Engines</h3>
					<div class="space-y-2">
						{#each settings.searchEngines as engine, index (engine.name)}
							<div
								class="card-glass flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between"
							>
								<div class="flex flex-col gap-1">
									<div class="flex items-center gap-2">
										<span class="text-lg font-medium text-white">{engine.name}</span>
										{#if engine.default}
											<span
												class="rounded bg-purple-600/40 px-2 py-0.5 text-xs font-semibold text-purple-200"
											>
												Default
											</span>
										{/if}
									</div>
									<span class="text-sm text-gray-300">{engine.searchUrl}</span>
									<span class="text-sm text-purple-300">Shortcut: {engine.shortcut}</span>
								</div>
								<button
									class="card-glass h-10 px-4 text-sm font-medium text-red-300 transition-colors hover:bg-red-600/30 hover:text-red-200"
									type="button"
									onclick={() => {
										settings.searchEngines = settings.searchEngines.filter((_, i) => i !== index);
									}}
								>
									Remove
								</button>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</section>

		<!-- Save Button -->
		<div class="flex justify-center gap-5">
			<button
				class="card-glass h-14 px-8 text-xl font-bold text-white transition-all ease-in hover:scale-105 hover:bg-purple-600/40 active:scale-95"
				type="button"
				onclick={() => save()}
			>
				Save Settings
			</button>
		</div>
	</div>
</main>
