export interface Board {
  id: string;
  title: string;
  description: string;
  statue: BoardStatus;
}

export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
