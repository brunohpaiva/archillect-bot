export interface ArchillectImageSources {
  google: string;
  otherLinks: string[];
}

export interface ArchillectImage {
  id: number;
  url: string;
  sources: ArchillectImageSources;
}
