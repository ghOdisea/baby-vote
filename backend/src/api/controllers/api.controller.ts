import { z } from "zod"
import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, OK } from "../constants/http"
import {   getVotes } from "../services/api.services"
import appAssert from "../utils/appAssert"
import catchErrors from "../utils/catchErrors"

export const GetVotesHandler = catchErrors( async (_, res) => {

      const votes = await getVotes()

      res.status(OK).json({
            votes
      })
})

export const PostVotesHandler = catchErrors(async (req, res) =>{
      const { data } = req.body

      appAssert(data, BAD_REQUEST, 'Data is required')
      const vote = await z.object({
            name: z.string().min(1),
            countryCode: z.string().min(2).max(2),
            optionId: z.string().min(1)
      }).parseAsync(data)

      appAssert(vote, INTERNAL_SERVER_ERROR, 'Something went wrong...')
      
      //Aquí iría la lógica para guardar el voto en la base de datos
      // const newVote = await createVote(vote)

      // appAssert(newVote, INTERNAL_SERVER_ERROR, 'Something went wrong...')

      res.status(CREATED).json({
            message:'Vote created successfully!',
            body: vote
      })

})
