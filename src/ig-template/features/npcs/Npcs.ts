import {Feature} from "@/ig-template/features/Feature";
import {NpcsSaveData} from "@/ig-template/features/npcs/NpcsSaveData";
import {Npc} from "@/ig-template/features/npcs/Npc";
import {SaveableNpc} from "@/ig-template/features/npcs/SaveableNpc";
import {NpcId} from "@/ig-template/features/npcs/NpcId";
import {WiseOldWoman} from "@/ig-template/features/npcs/wise-old-woman/WiseOldWoman";
import {Features} from "@/ig-template/Features";
import {King} from "@/ig-template/features/npcs/king/King";

export class Npcs extends Feature {
    npcs: Npc[] = []

    constructor() {
        super('npcs');
    }

    initialize(features: Features) {
        this.registerNpc(new WiseOldWoman(features.skills, features.inventory, features.itemList));
        this.registerNpc(new King( features.inventory, features.keyItems));
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
        data.npcs.forEach(npc => {
            (this.getNpc(npc.id) as SaveableNpc)?.load(npc.data)
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
