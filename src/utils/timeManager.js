export const timeFactory = time => {
    let splitedTime = time.split(':')

    let miliseconds = 
    (Number(splitedTime[0]) * 60 * 60 * 1000) +
    (Number(splitedTime[1]) * 60 * 1000) +
    (Number(splitedTime[2]) * 1000)

    const getTimeDiff = other => {
        let otherMiliseconds = other.inMiliseconds()
        let diff = otherMiliseconds > miliseconds
        ? otherMiliseconds - miliseconds
        : miliseconds - otherMiliseconds

        timeDiff = []

        timeDiff.push(String(Math.floor(diff / (1000 * 60 * 60))))
        timeDiff.push(String(Math.floor((diff / (1000 * 60)) % 60)))
        timeDiff.push(String(Math.floor((diff / 1000) % 60)))
        let stringDiff = ''

        for(let i = 0; i < timeDiff.length; i++) {
            let number = timeDiff[i]

            if(number.length === 1)
                number = '0' + number

            if(i < timeDiff.length - 1)
                stringDiff += number + ':'
            else
                stringDiff += number
        }

        return stringDiff

    }

    const object = {
        getTime : () => time,
        getTimeDiff,
        getHours : () => Number(splitedTime[0]),
        getMinutes : () => Number(splitedTime[1]),
        getSeconds : () => Number(splitedTime[2]),
        inMiliseconds : () => miliseconds
    }

    return object
}