export type SalsaEvent={
  id: number,
  address: string,
  venue: string,
  cover: number,
  discount?: number,
  music_provider?: string,
  start_time: Date,
  end_time: Date,
  class_time?: Date,
  flyer?: string,
  event_link?: string,
}

export const currEvents:SalsaEvent[] = 
[
  {
    id: 0,
    address: '232 E 9th St, New York, NY 10003',
    venue: 'Solas',
    cover: 15,
    start_time: new Date('2025-12-03T08:45:00Z'),
    end_time: new Date('2025-12-04T01:00:00Z'),
    music_provider: 'DJ Babaloo'
  },
  {
    id: 1,
    address: '38 West 32nd Street, 4th Floor, New York, NY 10001',
    venue: 'KTown Dance Studio',
    cover: 20,
    discount: 15, 
    start_time: new Date('2025-12-05T08:00:00Z'),
    end_time: new Date('2025-12-06T01:00:00Z'),
    music_provider: 'DJ La Conga',
    event_link: 'https://www.joelsalsa.com/dance-social'
  },
  {
    id: 1,
    address: '236b 6th St, Brooklyn, NY 11215',
    venue: 'Atolye',
    cover: 0,
    start_time: new Date('2025-12-04T08:00:00Z'),
    end_time: new Date('2025-12-05T01:00:00Z'),
    music_provider: 'DJ GeoSalsa'
  }
]