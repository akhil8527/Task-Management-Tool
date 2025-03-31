import { ApiResponse } from "../utils/api_response"

apiResponse = new ApiResponse()

const healthCheck = (request, response) => {
  response.status(200).json(apiResponse(200, { message: "Server is running" }))
}

export default healthCheck
