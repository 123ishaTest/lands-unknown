import {NpcId} from "@/ig-template/features/npcs/NpcId";
import {DialogTree} from "@/ig-template/tools/dialog/DialogTree";

export abstract class Npc {

    id: NpcId;

    // Override in initialize
    abstract dialog: DialogTree<any> = {} as unknown as DialogTree<any>;

    protected constructor(id: NpcId) {
        this.id = id;
    }

}
