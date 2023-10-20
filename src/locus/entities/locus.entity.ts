import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Member } from '../../member/entities/member.entity';

@Entity({ name: 'rnc_locus' })
export class Locus {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'locus_name' })
  locusName: string;

  @Column({ name: 'assembly_id' })
  assemblyId: string;

  @Column({ name: 'public_locus_name' })
  publicLocusName: string;

  @Column({ name: 'chromosome' })
  chromosome: string;

  @Column({ name: 'locus_start' })
  locusStart: string;

  @Column({ name: 'locus_stop' })
  locusStop: string;

  @Column({ name: 'strand' })
  strand: string;

  @Column({ name: 'member_count' })
  memberCount: string;

  @OneToMany(() => Member, (member) => member.locus)
  members: Member[];

}
