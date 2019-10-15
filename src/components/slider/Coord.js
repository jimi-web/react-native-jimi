export default class Coord {
    constructor(x, y, width, height) {
        this.contain = (x, y) => {
            return (x >= this.x &&
                y >= this.y &&
                x <= this.x + this.width &&
                y <= this.y + this.height);
        };
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
//# sourceMappingURL=Coord.js.map