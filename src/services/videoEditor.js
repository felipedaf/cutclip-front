import getVideoInfo from './videoInfo.js'
const ffmpeg = require('fluent-ffmpeg')
import timeFactory from '../util/timeManager'

const getProcess = async (videoInfo, startTime, endTime, format = 'mp4') => {
    const timeDiff = startTime.getTimeDiff(endTime)
    ffmpeg(videoInfo.audio)
    .setStartTime(startTime.getTime())
    .setDuration(timeDiff)
    .mergeAdd(videoInfo.video)
    .setStartTime(startTime.getTime())
    .setDuration(timeDiff)
    .videoCodec('copy')
    .output(`../../videos/output.${ format }`)
    .on('start', () => {
        console.log('Starting...')
    })
    .on('progress', e => {
        let current = timeFactory(e.timemark).inMiliseconds()
        let dif = timeFactory(timeDiff).inMiliseconds()
        console.log(((current / dif) * 100).toFixed(1))

    })
    .on('end', () => {
        console.log('Finished!')
    })
    .run()
}

const getAudioAndVideoUrl = (videoInfo, videoQuality) => {
    const content = {
        audio: videoInfo.audios[videoInfo.audios.length - 1].url
    }

    content.video = videoInfo.qualities[videoInfo.qualities.length - 1].url
    
    if(videoQuality) {
        videoInfo.qualities.forEach(video => {
            if(video.quality === videoQuality)
                content.video = video.url
        })
        
    }

    return content
}

const getCroppedVideo = async (url, startTime, endTime, videoQuality) => {
    const sTime = timeFactory(startTime)
    const eTime = timeFactory(endTime)
    const videoInfo = await getVideoInfo(url)
    const audioAndVideo = getAudioAndVideoUrl(videoInfo, videoQuality)
    getProcess(audioAndVideo, sTime, eTime, 'wmv')

}

getCroppedVideo(
    'https://www.youtube.com/watch?v=S_SXl-ETXRI&list=PL_Q15fKxrBb5pckIW2RHwZbgf-FwRiCWr&index=6',
    '00:02:00',
    '00:03:51',
    '1080p'
)