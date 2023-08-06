export type TPosition = {
  column: number; // Column number of this event
  columns: number; // Total number of columns for that slot
};

export type TEvent = {
  id: number;
  start: string;
  duration: number;
  start_date?: Date;
  end_date?: Date;
  position?: TPosition;
};
