export type FavouriteLink = {
	name: string;
	url: URL;
	iconUrl?: string;
};

export type SearchEngine = {
	name: string;
	searchUrl: URL;
	shortcut: string;
	default?: boolean;
};
