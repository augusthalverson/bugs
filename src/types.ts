export interface Action {
  type: string;
  payload: any;
}

export interface Bug {
  desc: string;
  id: number;
  isResolved: boolean;
}
