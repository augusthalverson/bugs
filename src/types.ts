export interface Action {
  type: string;
  payload: any;
}

export interface Bug {
  desc: string;
  id: string;
  isResolved: boolean;
}
