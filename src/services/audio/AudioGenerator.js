/** Always call `destroy` when you are finished using this class in your context */
class AudioGenerator {
    constructor() {
        this.file = {};
        this.instance = {};
        this.initialized = false;
    }

    async initRecorder() {
        this.chunks = [];
        this.stream = await navigator.mediaDevices.getUserMedia({
            audio: {
                channelCount: {
                    exact: 1,
                },
                sampleRate: 1600
            }
        });
        this.recorder = new MediaRecorder(this.stream, {
            bitsPerSecond: 16000
        });
        this.recorder.addEventListener("dataavailable", event => this.chunks.push(event.data));
        this.initialized = true;
    }

    destroy() {
        if (this.stream)
            this.stream.getTracks().forEach(track => track.stop());
    }

    async record() {
        await this.initRecorder();
        this.recorder.start();
    }

    stopRecord() {
        return new Promise((resolve, reject) => {
            if (this.initialized) {
                this.recorder.addEventListener("stop", () => {
                    this.generateFromBuffer(this.chunks);
                    resolve(this.instance);
                });
                this.recorder.stop();
                // this.stream.getTracks().forEach(track => track.stop());
            } else {
                reject(new Error("Not initialized"));
            }
        });
    }

    generateFromBuffer(buffer) {
        this.file = new Blob(buffer, { type: 'audio/wav' });
        
        let src = URL.createObjectURL(this.file);
        this.instance = new Audio(src);
        
        return this.instance;
    }
}

export default AudioGenerator