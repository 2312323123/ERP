import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Availability } from './availabilities/entities/availability.entity';
import { CreateAvailabilityDto, UserAvailabilityInfo } from './availabilities/dto/create-availability.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Availability)
    private readonly availabilityRepository: Repository<Availability>,
  ) {}

  async updateAvailability(createAvailabilityDto: CreateAvailabilityDto): Promise<void> {
    const { id, availability } = createAvailabilityDto;

    // remove existing entries for the ID
    await this.availabilityRepository.delete({ id });

    // validate and save new entries
    const entries = availability.map((slot) => {
      if (slot.end <= slot.start) {
        throw new BadRequestException(`Invalid availability slot: start ${slot.start}, end ${slot.end}`);
      }
      return this.availabilityRepository.create({ id, start: slot.start, end: slot.end });
    });

    await this.availabilityRepository.save(entries);
  }

  async getAvailability(ids: string[]): Promise<UserAvailabilityInfo[]> {
    const entries = await this.availabilityRepository
      .createQueryBuilder('availability')
      .where('availability.id IN (:...ids)', { ids })
      .getMany();

    const groupedEntries = entries.reduce((acc: Record<string, any>, entry) => {
      if (!acc[entry.id]) acc[entry.id] = [];
      acc[entry.id].push({ start: entry.start, end: entry.end });
      return acc;
    }, {});

    return Object.keys(groupedEntries).map((id) => ({
      id,
      availability: groupedEntries[id],
    }));
  }
}
