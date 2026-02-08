import type { Settings } from '$lib/types';

const defaultSettings: Settings = {
	clockFormat: 'H:m:s d/M/Y',
	favourites: [
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
	],
	searchEngines: [
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
	]
};

export const saveSettings = (settings: Settings): null | unknown => {
	try {
		localStorage.setItem('settings', JSON.stringify(settings));
		return null;
	} catch (e) {
		console.error(e);
		return e;
	}
};

export const getSettings = (): Settings => {
	try {
		const data = localStorage.getItem('settings');

		if (!data) {
			return defaultSettings;
		}

		return JSON.parse(data);
	} catch (e) {
		console.error(e);
		return defaultSettings;
	}
};
