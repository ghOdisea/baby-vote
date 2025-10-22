import { VoteRepository } from "../core/ports/repository";
import { Vote } from "../core/vote";
import { client } from "./config/dbClient";

export class pgVoteRepo implements VoteRepository {
        async fetchVotes(): Promise<Vote[]> {
                const result = await client.query("SELECT * FROM public.votes");
                return result.rows;
        }
        async createVote(vote: Vote): Promise<Vote> {
                const result = await client.query("INSERT INTO votes (user_id, post_id, value) VALUES ($1, $2, $3) RETURNING *", [vote.userId, vote.postId, vote.value]);
                return result.rows[0];
        }
        

}