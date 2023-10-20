// database.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Locus } from 'src/locus/entities/locus.entity';
import { Member } from 'src/member/entities/member.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'hh-pgsql-public.ebi.ac.uk',
  port: 5432,
  username: 'reader',
  password: 'NWDMCE5xdipIjRrp',
  database: 'pfmegrnargs',
  entities: [Locus, Member],
  synchronize: false,
};
