import { z } from "zod";
import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, OK } from "../constants/http";
import { getVotes, createVote, getStats } from "../services/api.services";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";

// zod schema
const VoteSchema = z.object({
  name: z.string().min(1).max(80),
  countryCode: z.string().length(2),   // ISO-2
  option: z.number().int().min(1).max(3)
});

export const GetVotesHandler = catchErrors(async (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : undefined;
  const votes = await getVotes(limit);
  res.status(OK).json({ votes: votes.map(v => v.toDTO()) });
});

export const PostVotesHandler = catchErrors(async (req, res) => {
  const data = req.body;
  appAssert(data, BAD_REQUEST, 'Data is required');

  const parsed = await VoteSchema.safeParseAsync({
    name: data?.name,
    countryCode: data?.countryCode,
    option: data?.option ?? Number(data?.optionId) // compat: optionId (string) → option (number)
  });

  appAssert(parsed.success, BAD_REQUEST, 'Invalid payload');

  const newVote = await createVote(parsed.data);
  appAssert(newVote, INTERNAL_SERVER_ERROR, 'Something went wrong...');

  res.status(CREATED).json({
    message: 'Vote created successfully!',
    vote: newVote.toDTO()
  });
});

export const StatsHandler = catchErrors(async (_req, res) => {
  const stats = await getStats();
  res.status(OK).json({ totals: stats });
});
