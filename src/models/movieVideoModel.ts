export interface VideoModel {
    id:      number;
    results: Video[];
}

export interface Video {
    id:           string;
    iso_639_1:    string;
    iso_3166_1:   string;
    key:          string;
    name:         string;
    site:         string;
    size:         number;
    type:         string;
    official:     boolean;
    published_at: Date;
}
