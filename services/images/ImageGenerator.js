class ImageGenerator {
    constructor() {
        this.base = `https://source.unsplash.com`;
        this.width = 1600;
        this.length = 900;
        this.search = [];
    }

    topics(...topics) {
        this.search = topics;

        return this;
    }

    url() {
        if (!this.search.join())
            throw new Error(`${this.constructor.name}: specify some topics to search first.`);

        return `${this.base}/${this.width}x${this.length}/?${this.search.join()}`;
    }
}

export default ImageGenerator