/** Always call `destroy` when you are finished using this class in your context */
class AudioGenerator {
    constructor() {
        this.file = {};
        this.instance = {};
        this.initialized = false;
    }

    async initRecorder() {
        this.chunks = [];
        this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.recorder = new MediaRecorder(this.stream);
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
        this.file = new Blob(buffer, { type: 'audio/mp4' });
        let src = URL.createObjectURL(this.file);
        this.instance = new Audio(src);
        
        return this.instance;
    }
}

export default AudioGenerator