import { Module } from '@nestjs/common';
import { LocusService } from './locus.service';
import { LocusController } from './locus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locus } from './entities/locus.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Locus]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [LocusController],
  providers: [LocusService],
})
export class LocusModule {}
