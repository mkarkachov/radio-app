export interface IRadioStation {
  name: string;
  frequency: number;
  image: string;
  playing: boolean;
  playStation: () => void;
  changeStation: (direction: ChangeStationEnum) => void;
}

export interface IRadioPageProps {
  radios: IRadioStation[];
}

export enum ChangeStationEnum {
  Prev = "PREV",
  Next = "NEXT",
}
