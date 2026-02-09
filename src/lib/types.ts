export type FavouriteLink = {
	name: string;
	url: string;
	iconUrl?: string;
};

export type SearchEngine = {
	name: string;
	searchUrl: string;
	shortcut: string;
	default?: boolean;
};

export type Settings = {
	clockFormat: string;
	favourites: FavouriteLink[];
	searchEngines: SearchEngine[];
};
