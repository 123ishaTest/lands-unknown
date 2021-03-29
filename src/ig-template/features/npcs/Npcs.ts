import {Feature} from "@/ig-template/features/Feature";
import {NpcsSaveData} from "@/ig-template/features/npcs/NpcsSaveData";
import {Npc} from "@/ig-template/features/npcs/Npc";
import {SaveableNpc} from "@/ig-template/features/npcs/SaveableNpc";
import {NpcId} from "@/ig-template/features/npcs/NpcId";
import {WiseOldWoman} from "@/ig-template/features/npcs/wise-old-woman/WiseOldWoman";
import {Features} from "@/ig-template/Features";
import {King} from "@/ig-template/features/npcs/king/King";
import {Lumberjack} from "@/ig-template/features/npcs/lumberjack/Lumberjack";
import {Captain} from "@/ig-template/features/npcs/captain/Captain";

export class Npcs extends Feature {
    npcs: Npc[] = []

    constructor() {
        super('npcs');
    }

    initialize(features: Features) {
        this.registerNpc(new WiseOldWoman(features.skills, features.inventory, features.itemList));
        this.registerNpc(new King(features.inventory, features.keyItems));
        this.registerNpc(new Lumberjack());
        this.registerNpc(new Captain());
    }

    registerNpc<T extends Npc>(npc: T): T {
        this.npcs.push(npc);
        return npc;
    }

    getNpc(id: NpcId): Npc {
        return this.npcs.find(npc => {
            return npc.id === id;
        }) as Npc
    }

    load(data: NpcsSaveData): void {
        data.npcs.forEach(npcData => {
            const npc = this.getNpc(npcData.id);
            if (npc instanceof SaveableNpc) {
                npc.load(npcData);
            }
        })
    }

    save(): NpcsSaveData {
        return {
            npcs: this.npcs.filter(npc => {
                return npc instanceof SaveableNpc;
            }).map(npc => {
                return {
                    id: npc.id,
                    data: (npc as SaveableNpc).save(),
                }
            })
        };
    }

}
