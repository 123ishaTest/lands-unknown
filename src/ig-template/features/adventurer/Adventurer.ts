import {Feature} from "@/ig-template/features/Feature";
import {SaveData} from "@/ig-template/tools/saving/SaveData";
import {TravelAction} from "@/ig-template/features/world-map/TravelAction";

export class Adventurer extends Feature {


    constructor() {
        super('adventurer');
    }

    load(): void {
        // Empty
    }

    save(): SaveData {
        return {};
    }

    addAction(travelAction: TravelAction) {
        console.log("adding action", travelAction);
    }
}
