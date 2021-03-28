import {NpcId} from "@/ig-template/features/npcs/NpcId";
import {DialogTree} from "@/ig-template/tools/dialog/DialogTree";
import {Features} from "@/ig-template/Features";

export abstract class Npc {

    id: NpcId;

    // Override in initialize
    dialog: DialogTree = {} as unknown as DialogTree;

    protected constructor(id: NpcId) {
        this.id = id;
    }

    /**
     * Make sure to override to create the dialog
     */
    abstract initialize(features: Features): void;

}
