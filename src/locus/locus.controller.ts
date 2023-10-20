import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LocusService } from './locus.service';
import { ApiParam, ApiQuery } from '@nestjs/swagger';
import { Roles, SideLoading, SortingOrder } from './locus.enum';
import { JwtService } from '@nestjs/jwt';

@Controller('locus')
export class LocusController {
  constructor(
    private readonly locusService: LocusService,
    private jwtService: JwtService,
  ) {}
  @Get()
  @ApiQuery({
    name: 'jwt',
    type: String,
    description: 'to get data with locusMembers',
    required: true,
  })
  @ApiQuery({
    name: 'regionId',
    type: Number,
    description: 'Region Id',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    description: 'pagination',
    required: false,
  })
  @ApiQuery({
    name: 'count',
    type: Number,
    description: 'Number of Record to fetch',
    required: false,
  })
  @ApiQuery({
    name: 'id',
    type: Number,
    description: 'Locus Id',
    required: false,
  })
  @ApiQuery({
    name: 'assemblyId',
    type: String,
    description: 'Assembly Id',
    required: false,
  })
  @ApiQuery({
    name: 'membershipStatus',
    type: String,
    description: 'Membership Status',
    required: false,
  })
  @ApiQuery({
    name: 'sort',
    type: String,
    description: 'Enter field name to sort',
    required: false,
  })
  @ApiQuery({
    name: 'orderBy',
    type: String,
    description: 'Allowed sorting order ASC or DESC',
    required: false,
  })
  @ApiQuery({
    name: 'sideLoading',
    type: String,
    description: 'to get data with locusMembers',
    required: false,
  })
  findAll(
    @Query('regionId') regionId: number,
    @Query('page') page: number = 1,
    @Query('count') count: number = 1000,
    @Query('id') id: number,
    @Query('assemblyId') assemblyId: string,
    @Query('membershipStatus') membershipStatus: string,
    @Query('sort') sort: 'id' | 'memberCount' = 'id',
    @Query('orderBy')
    orderBy: SortingOrder = SortingOrder.ASC,
    @Query('sideLoading') sideLoading: SideLoading,
    @Query('jwt') jwt: string,
  ) {
    const decodedToken = this.jwtService.verify(jwt, { secret: 'secret' });
    try {
      return this.locusService.findAll(
        decodedToken.role,
        page,
        count,
        regionId,
        id,
        assemblyId,
        membershipStatus,
        sort,
        orderBy,
        sideLoading,
      );
    } catch (error) {
      console.log('error', error);

      return error;
    }
  }
}
