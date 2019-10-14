export default class Coord {
    private x;
    private y;
    private width;
    private height;
    constructor(x: any, y: any, width: any, height: any);
    contain: (x: any, y: any) => boolean;
}
