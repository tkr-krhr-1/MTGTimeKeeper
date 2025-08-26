
export interface MeetingData {
  goal: string;
  agenda: string;
  duration: number; // in minutes
}

export enum MeetingPhase {
  Introduction,
  Discussion,
  NextActions,
  WrapUp,
  Finished,
}
