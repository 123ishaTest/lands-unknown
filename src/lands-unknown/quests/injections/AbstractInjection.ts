import {Features} from "@/ig-template/Features";

export abstract class AbstractInjection {
    abstract inject(features: Features): void;

    abstract eject(features: Features): void;
}
