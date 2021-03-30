import {NpcDecision} from "@/ig-template/tools/dialog/NpcDecision";
import {KeyItem} from "@/ig-template/features/key-items/KeyItem";

export class KeyItemDecision<T> extends NpcDecision<T> {
    constructor(id: T, keyItem: KeyItem, ifUnlocked: T, ifNotUnlocked: T) {
        super(id, () => {
            return keyItem.isUnlocked ? ifUnlocked : ifNotUnlocked
        });
    }
}
