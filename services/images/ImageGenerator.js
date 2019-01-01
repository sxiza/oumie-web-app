import unsplash from 'unsplash-source-node'

class ImageGenerator {
    constructor() {
        this.client = unsplash({ });
    }

    topic(...topics) {
        this.client.of(topics);

        return this;
    }

    async url() {
        await this.client.fetch();
    }
}

export default ImageGenerator