import { Locus } from 'src/locus/entities/locus.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'rnc_locus_members' })
export class Member {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'locus_id' })
  locusId: number;

  @Column({ name: 'urs_taxid' })
  ursTaxId: string;

  @Column({ name: 'region_id' })
  regionId: number;

  @Column({ name: 'membership_status' })
  membershipStatus: string;

  @ManyToOne(() => Locus, (locus) => locus.members)
  @JoinColumn({ name: 'locus_id' })
  locus: Locus;
}
