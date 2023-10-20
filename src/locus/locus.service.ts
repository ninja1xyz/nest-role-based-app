import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { Locus } from './entities/locus.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from './locus.enum';

@Injectable()
export class LocusService {
  constructor(
    @InjectRepository(Locus)
    private readonly locus: Repository<Locus>,
    private readonly entityManager: EntityManager,
  ) {}
  async findAll(
    role: string,
    page: number,
    count: number,
    regionId: number,
    id: number,
    assemblyId: string,
    membershipStatus: string,
    sort: string,
    orderBy: string,
    sideLoading: string,
  ) {
    let select = [];
    let members = false;

    console.log('rolee', role);

    if (role == Roles.LIMITED) {
      if (regionId == null && regionId == undefined)
        return 'region id is required for limited role';

      members = true;
      const allowedRegionIds = [86118093, 86696489, 88186467];
      const isVerifiedId = allowedRegionIds.find(
        (allowedId) => allowedId == regionId,
      );

      if (!isVerifiedId) return 'please use correct region id';
    } else if (role == Roles.NORMAL) {
      members = false;
    } else if (role == Roles.ADMIN) {
      members = sideLoading === 'locusMembers' ? true : false;
    } else {
      return 'invalid user role';
    }

    const skip = (page - 1) * count;

    return await this.locus.find({
      take: count,
      skip: skip,
      where: {
        id,
        assemblyId,
        members: {
          regionId,
          membershipStatus,
        },
      },
      relations: {
        members,
      },
      order: {
        [sort]: orderBy, // Use the sort and order parameters
      },
      select,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} rnsLocus`;
  }
}
