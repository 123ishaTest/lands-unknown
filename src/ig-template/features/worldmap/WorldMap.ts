import {Feature} from "@/ig-template/features/Feature";
import {SaveData} from "@/ig-template/tools/saving/SaveData";

export class WorldMap extends Feature {

    constructor() {
        super('world-map');
    }

    load(): void {
        // Empty
    }

    save(): SaveData {
        return {};
    }

}
