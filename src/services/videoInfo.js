const youtubedl = require('youtube-dl')

const populateAudios = (info, available) => {
    const compareAudios = (a, b) => {
        if(a.size > b.size)
            return 1
        if(a.size < b.size)
            return -1
        
        return 0
    }

    info.formats.forEach(format => {
        if(format.format_note.includes('tiny')) {
            available.audios.push({
                url: format.url,
                id: format.format_id,
                size: format.filesize
            })
        }
    })

    available.audios.sort(compareAudios)
}

const populateResolutions = (info, available) => {
    const compareResolutions = (a, b) => {
        let resolutionA = Number(a.quality.slice(0, a.quality.length - 1))
        let resolutionB = Number(b.quality.slice(0, b.quality.length - 1))
        if(resolutionA > resolutionB)
            return 1
         if(resolutionA < resolutionB)
            return -1

        return 0
    }

    info.formats.forEach(format => {
        if(!format.format_note.includes('tiny') && format.ext === 'mp4') {
            available.qualities.push({
                url: format.url,
                id: format.format_id,
                quality: format.format_note
            })
        }
    })

    available.qualities.sort(compareResolutions)
}

const getVideoInfo = async url => {
    const available = {
        qualities: [],
        audios: []
    }

    await new Promise((resolve, reject) => {
        youtubedl.getInfo(url, (err, info) => {
            if(err)
                reject()

            try {
                populateAudios(info, available)
                populateResolutions(info, available)
                resolve()
            }
            catch(e) {
                console.log(e)
                reject()
            }
        }
    )})

    return available
}

module.exports = getVideoInfo