import { ISpace, IRectangle } from "./popover.interfaces";

export class Space implements ISpace {
    
    public above = (spaceNeed: number, rectangle: IRectangle) => {
        return false;
    }

    public below = (spaceNeed: number, rectangle: IRectangle) => {
        return false;
    }

    public left = (spaceNeed: number, rectangle: IRectangle) => {
        return false;
    }

    public right = (spaceNeed: number, rectangle: IRectangle) => {
        return false;
    }
}
