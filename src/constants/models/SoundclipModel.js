class SoundclipModel {
    static get STATUS_RECORDED() { return 0 }
    static get STATUS_SENT() { return 1 }
    static get STATUS_DELIVERED() { return 2 }
    static get STATUS_INVALID() { return 3 }

    static statusColour(status, forText = false) {
        let text = forText ? '--text' : '';
        let textMarker = forText ? 'text--' : '';
    
        switch(status) {
            case SoundclipModel.STATUS_RECORDED:
                return `blue${text} ${textMarker}darken-2`;
            case SoundclipModel.STATUS_SENT:
                return `amber${text}`;
            case SoundclipModel.STATUS_DELIVERED:
                return `green${text} ${textMarker}lighten-1`;
            case SoundclipModel.STATUS_INVALID:
                return `red${text}`;
        }
    }
}

export default SoundclipModel