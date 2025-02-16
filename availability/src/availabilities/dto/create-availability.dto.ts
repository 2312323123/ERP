export type _Availability = {
  start: number;
  end: number;
}[];

export class CreateAvailabilityDto {
  id: string;
  availability: _Availability;
}

export class UserAvailabilityInfo {
  id: string;
  availability: _Availability;
}
