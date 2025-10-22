import { pool } from "../../db/pool";
import { VoteRepository } from "../core/ports/repository";
import { Vote } from "../core/vote";

export class PgVoteRepo implements VoteRepository {
  async fetchVotes(limit = 100): Promise<Vote[]> {
    const { rows } = await pool.query(
      `select id, name, country_code, option, created_at
         from votes
        order by created_at desc
        limit $1`,
      [Math.min(limit, 500)]
    );
    return rows.map(Vote.fromRow);
  }

  async createVote(v: Omit<Vote, 'id'|'createdAt'>): Promise<Vote> {
    const { rows } = await pool.query(
      `insert into votes (name, country_code, option)
       values ($1, $2, $3)
       returning id, name, country_code, option, created_at`,
      [v.name, v.countryCode.toUpperCase(), v.option]
    );
    return Vote.fromRow(rows[0]);
  }

  async fetchStats(): Promise<Array<{ option: number; count: number }>> {
    const { rows } = await pool.query(
      `select option::int, count(*)::int as count
         from votes
        group by votes.option
        order by votes.option asc`
    );
    return rows.map(r => ({ option: Number(r.option), count: Number(r.count) }));
  }
}
