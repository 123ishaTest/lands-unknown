import {Feature} from "@/ig-template/features/Feature";
import {WorldLocationIdentifier} from "@/ig-template/features/world-map/WorldLocationIdentifier";
import {Town} from "@/ig-template/features/world-map/towns/Town";
import {WorldLocation} from "@/ig-template/features/world-map/WorldLocation";
import {TownLocationIdentifier} from "@/ig-template/features/world-map/towns/TownLocationIdentifier";
import {Road} from "@/ig-template/features/world-map/roads/Road";
import {WorldSaveData} from "@/ig-template/features/world-map/WorldSaveData";
import {Adventurer} from "@/ig-template/features/adventurer/Adventurer";
import {Features} from "@/ig-template/Features";
import {TravelAction} from "@/ig-template/features/world-map/TravelAction";
import {WorldLocationId} from "@/ig-template/features/world-map/WorldLocationId";
import {Dijkstra} from "@/ig-template/features/world-map/Dijkstra";
import {GainItemAction} from "@/ig-template/tools/actions/GainItemAction";
import {ItemId} from "@/ig-template/features/items/ItemId";

export class WorldMap extends Feature {
    _adventurer: Adventurer = undefined as unknown as Adventurer;

    playerLocation: WorldLocationIdentifier;

    roads: Road[];
    towns: Town[];

    locations: WorldLocation[];

    constructor(roads: Road[], towns: Town[]) {
        super('world-map');
        this.roads = roads;
        this.towns = towns;

        this.locations = [...roads, ...towns];

        this.playerLocation = new TownLocationIdentifier(WorldLocationId.FisherMan);
    }


    initialize(features: Features) {
        this._adventurer = features.adventurer;

        // Populate locations with actions here
        this.getTown(WorldLocationId.FisherMan).addAction(new GainItemAction(ItemId.RawFish, "Fish", 3, features.inventory, features.itemList));
    }

    /**
     * Try to move from the player location to the target, returns true if possible
     * @param target to move to
     */
    moveToLocation(target: WorldLocationIdentifier): boolean {
        const startingLocation = this._adventurer.getPlayerLocationAtEndOfQueue();


        if (startingLocation.equals(target)) {
            console.log(`You're already at ${target}`);
            return false;
        }

        const path = this.getPath(startingLocation, target);
        if (path == null) {
            console.log(`There is no road from ${startingLocation} to ${target}`);
            return false;
        }

        let lastSource = startingLocation;

        for (let i = 0; i < path.length; i++) {
            const road = path[i];
            const reverse = road.to.equals(lastSource);
            const newAction = new TravelAction(road, reverse, this);
            this._adventurer.addAction(newAction);
            lastSource = newAction.to;
        }
        return true;
    }

    getCurrentLocation(): WorldLocation | null {
        return this.getLocation(this.playerLocation)
    }

    getTown(id: WorldLocationId): Town {
        return this.getLocation(new TownLocationIdentifier(id)) as Town;
    }

    getLocation(id: WorldLocationIdentifier) {
        for (const location of this.locations) {
            if (location.identifier.equals(id)) {
                return location;
            }
        }
        console.error(`Could not find player location ${this.playerLocation}`);
        return null;
    }

    setLocation(target: WorldLocationIdentifier) {
        this.playerLocation = target;
    }

    areConnected(from: WorldLocationIdentifier, to: WorldLocationIdentifier): boolean {
        return this.getPath(from, to) !== null;
    }

    getPath(from: WorldLocationIdentifier, to: WorldLocationIdentifier): Road[] | null {
        const dijkstra = new Dijkstra(this.roads);
        return dijkstra.solve(from, to);

    }

    load(): void {
        // Empty
    }

    save(): WorldSaveData {
        return {};
    }

}
