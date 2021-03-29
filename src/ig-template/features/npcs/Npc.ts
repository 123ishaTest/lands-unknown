import {NpcId} from "@/ig-template/features/npcs/NpcId";
import {DialogTree} from "@/ig-template/tools/dialog/DialogTree";

export abstract class Npc {

    name: string;
    id: NpcId;

    // Override in initialize
    abstract dialog: DialogTree<any> = {} as unknown as DialogTree<any>;

    protected constructor(id: NpcId, name: string) {
        this.id = id;
        this.name = name;
    }

}
