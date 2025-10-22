import { Vote } from "../core/vote"


export const getServiceHealth = async () => {
      const message = 'GET service is healthy'
      return message
}

export async function getVotes(): Promise<Vote[]> {
      // Aquí iría la lógica para obtener los votos desde la base de datos
      const votes: Vote[] = await fetchVotesFromDB();
      return votes;
// }
//       const votes = [
//             new Vote('1', 'Alice', 'US', '1', new Date()),
//             new Vote('2', 'Bob', 'GB', '2', new Date())
//       ]
//       return votes
}



function fetchVotesFromDB(): Vote[] | PromiseLike<Vote[]> {
      throw new Error("Function not implemented.");
}