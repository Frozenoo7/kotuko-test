export interface Editions {
  id: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  code: string;
}

export interface ISectionResponse {
  id: string;
  webTitle: string;
  apiUrl: string;
  editions: Editions[];
}
