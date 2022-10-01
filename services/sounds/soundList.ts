const sounds: string[] = ['https://www.youtube.com/watch?v=3s22jQCwJUA', 'https://youtu.be/-OHNR8BcIQY', 'https://www.youtube.com/watch?v=vS8e5dg-UaM', 'https://www.youtube.com/watch?v=o_4SrI9iX3U&list=PLPhvEBOOIaZnmmiL7l_UZ8PBrskrcybcZ&index=1', 'https://www.youtube.com/watch?v=x2_OfLP8vVg', 'https://www.youtube.com/watch?v=ADWsNPMon1c', 'https://www.youtube.com/watch?v=P5MphlfhOOA', 'https://www.youtube.com/watch?v=gQm8hyMfz2o', 'https://www.youtube.com/watch?v=oaCvLk35BEs', 'https://www.youtube.com/watch?v=Zh1pd2GsRvc', 'https://www.youtube.com/watch?v=-IKImLi-8BY']
let rogersProbability = 0.07

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
        if (Math.random() >= (1 - rogersProbability)) {
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
    removeSound: (url: string) => {
        console.log('removing', url);

        var index = sounds.indexOf(url);
        if (index !== -1) {
            sounds.splice(index, 1);
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
    getSoundsAsArr: () => {
        return sounds
    },
    setRogersProbability: (prob: number) => {
        rogersProbability = prob;
        return 'Rogers will play if random is >= ' + (1 - prob).toString()
    },
    getRandomSound: getRandomSound

}