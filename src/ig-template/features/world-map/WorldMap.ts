import {Feature} from "@/ig-template/features/Feature";
import {WorldLocationIdentifier} from "@/ig-template/features/world-map/WorldLocationIdentifier";
import {Town} from "@/ig-template/features/world-map/towns/Town";
import {WorldLocation} from "@/ig-template/features/world-map/WorldLocation";
import {TownLocationIdentifier} from "@/ig-template/features/world-map/towns/TownLocationIdentifier";
import {TownId} from "@/ig-template/features/world-map/towns/TownId";
import {Road} from "@/ig-template/features/world-map/roads/Road";
import {WorldSaveData} from "@/ig-template/features/world-map/WorldSaveData";
import {Adventurer} from "@/ig-template/features/adventurer/Adventurer";
import {Features} from "@/ig-template/Features";
import {TravelAction} from "@/ig-template/features/world-map/TravelAction";

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

        this.playerLocation = new TownLocationIdentifier(TownId.FisherMan);
    }


    initialize(features: Features) {
        this._adventurer = features.adventurer;
    }

    /**
     * Try to move from the player location to the target, returns true if possible
     * @param target to move to
     */
    moveToLocation(target: WorldLocationIdentifier): boolean {
        // TODO take queue into account
        // const startingLocation = App.game.player.getPlayerLocationAtEndOfQueue();
        const startingLocation = this.playerLocation;


        if (startingLocation.equals(target)) {
            console.log(`You're already at ${target}`);
            return false;
        }

        const road = this.getConnectionRoad(startingLocation, target);
        if (road == null) {
            console.log(`There is no road from ${startingLocation} to ${target}`);
            return false;
        }
        // console.log("success");
        const reverse = road.to.equals(startingLocation);

        this._adventurer.addAction(new TravelAction(road, reverse, this));
        return true;
    }

    getCurrentLocation(): WorldLocation | null {
        return this.getLocation(this.playerLocation)
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
        return this.getConnectionRoad(from, to) !== null;
    }

    getConnectionRoad(from: WorldLocationIdentifier, to: WorldLocationIdentifier): Road | null {
        // TODO(@Isha) improve efficiency, this is why you went to uni.
        for (const road of this.roads) {
            // Bidirectional roads
            // console.log(`${road.from} - ${road.to} - ${from} - ${to}`);
            // console.log("road.from", road.from);
            // console.log("road.to", road.to);
            // console.log("from", from);
            // console.log("from", to);
            // console.log(road);
            if (road.from.equals(from) && road.to.equals(to) || road.from.equals(to) && road.to.equals(from)) {
                return road;
            }
        }
        return null;
    }

    load(): void {
        // Empty
    }

    save(): WorldSaveData {
        return {};
    }

}
