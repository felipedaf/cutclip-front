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
    getACut: async videoHash => {
        const response = await axios.get(`${apiUrl}/cut/download/${videoHash}`, {
            responseType: "arraybuffer"
        })

        return response
    },
    printSomething: () => {
        console.log("printing")
    }

})

export default API
