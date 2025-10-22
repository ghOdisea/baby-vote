import { z } from "zod";
import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, OK } from "../constants/http";
import { getVotes, createVote, getStats } from "../services/api.services";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";
import { VoteSchema } from "./schemas/vote.schema";

export const GetVotesHandler = catchErrors(async (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : undefined;
  const votes = await getVotes(limit);
  res.status(OK).json({ votes: votes.map(v => v.toDTO()) });
});

export const PostVotesHandler = catchErrors(async (req, res) => {
  const data = req.body;
  console.log("POST /api/votes body =>", data);

  appAssert(data, BAD_REQUEST, "Data is required");

  // Acepta country_code o countryCode; option o optionId (string/number)
  const candidate = {
    name: data?.name,
    country_code: data?.country_code ?? data?.countryCode,
    option: data?.option ?? data?.optionId
  };

  const parsed = VoteSchema.safeParse(candidate);

  if (!parsed.success) {
    // Log útil para depurar rápidamente
    console.error("Zod issues:", parsed.error.issues);
    appAssert(false, BAD_REQUEST, "Invalid payload"); // conserva tu flujo de errores
  }

  const payload = parsed.data; // { name, country_code, option }

  const newVote = await createVote({
    name: payload.name,
    countryCode: payload.country_code, // tu servicio espera camelCase
    option: payload.option
  });

  appAssert(newVote, INTERNAL_SERVER_ERROR, "Something went wrong...");

  res.status(CREATED).json({
    message: "Vote created successfully!",
    vote: newVote.toDTO()
  });
});

export const StatsHandler = catchErrors(async (_req, res) => {
  const stats = await getStats();
  res.status(OK).json({ totals: stats });
});
