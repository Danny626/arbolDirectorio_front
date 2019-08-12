export interface Folder {
  data: string;
  nivel: number;
}

export interface Nodo {
  label: string;
  data: string;
  icon: string;
  expandedIcon: any;
  collapsedIcon: any;
  type: string;
  children: Nodo[];
}
