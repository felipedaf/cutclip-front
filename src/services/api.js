const axios = require("axios");
const apiUrl = "http://localhost:8000"

const API = () => ({
    makeACut: async cutParams => {
        const {
            videoName,
            youtubeId,
            startTime,
            endTime,
            format,
            quality
        } = cutParams

        const response = await axios.post(`${apiUrl}/cut`, {
            videoName,
            youtubeId,
            startTime,
            endTime,
            format,
            quality
        })

        return response

    },
    printSomething: () => {
        console.log("printing")
    }

})

export default API
