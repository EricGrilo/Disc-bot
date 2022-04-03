const sounds: string[] = ['https://www.youtube.com/watch?v=3s22jQCwJUA', 'https://youtu.be/-OHNR8BcIQY', 'https://www.youtube.com/watch?v=vS8e5dg-UaM']

function validateYouTubeUrl(url: string) {
    if (url != undefined || url != '') {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[2].length == 11) {
            // Do anything for being valid
            // if need to change the url to embed url then use below line
            return true
        }
        else {
            return false
        }
    }
}
const getRandomSound: any = () => {
    let sound = sounds[Math.floor(Math.random() * sounds.length)];
    if (sound === 'https://www.youtube.com/watch?v=3s22jQCwJUA') {
        if (Math.random() >= 0.93) {
            return sound
        } else {
            return getRandomSound()
        }
    }
    return sound;
}


export default {
    addSound: (link: string) => {
        if (validateYouTubeUrl(link)) {
            sounds.push(link)
            return false
        } else {
            return true
        }
    },
    addMultipleSounds: (link: string) => {
        let linkArray = link.split(',');
        let errorUrl: string[] = []
        linkArray.forEach(link => {
            if (validateYouTubeUrl(link)) {
                if (sounds.indexOf(link) === -1) {
                    sounds.push(link)
                }
            } else {
                errorUrl.push(link)
            }
        })
        if (errorUrl.length !== 0) {
            return { error: true, errorUrl }
        } else {
            return { error: false }
        }
    },
    getSounds: () => {
        return sounds.toString() + '   ' + sounds.length + ' sons'
    },
    getRandomSound: getRandomSound

}