export interface Tab {
  id: string;
  url: string;
  name: string;
}

export interface TabGroup {
  id: string;
  name: string;
  tabs: Tab[];
  createdAt: string;
}

export interface SingleTab {
  id: string;
  name: string;
  url: string;
  createdAt: string;
}
