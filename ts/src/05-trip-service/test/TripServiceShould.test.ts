import TripService from "../code/trip/TripService";
import User from "../code/user/User";
import UserNotLoggedInException from "../code/exception/UserNotLoggedInException";
import Trip from "../code/trip/Trip";

class TripServiceOverload extends TripService {
    private trips: Trip[] = [];
    private loggedUser: User | null = null;
    
    protected getLoggedUser(): User | null{
        return this.loggedUser;
    }

    public setLoggedUser(user: User | null): void {
        this.loggedUser = user;
    }

    protected getTripList(user: User): Trip[] {
        return this.trips;
    }

    public setTripList(trips: Trip[]) {
        this.trips = trips;
    }
}

describe("TripServiceShould", () => {
    it('should throw an exception when user is not logged', () => {
        const tripService = new TripServiceOverload();
        expect(() => tripService.getTripsByUser(new User())).toThrow(new UserNotLoggedInException());
    });

    it('should return empty list if user has no friend', () => {
        const tripService = new TripServiceOverload();
        const alice = new User();
        const bob = new User();
        
        tripService.setLoggedUser(alice);

        expect(tripService.getTripsByUser(bob)).toEqual([]);
    });

    it('should return no trip if target user is not friend with logged user', () => {
        const tripService = new TripServiceOverload();
        const alice = new User();
        const bob = new User();
        const carol = new User();
        bob.addFriend(carol);

        const tripToLondon = new Trip();
        tripService.setTripList([tripToLondon]);
        
        tripService.setLoggedUser(alice);

        expect(tripService.getTripsByUser(bob)).toEqual([]);
    });

    it('should return user\'s trips if target user is friend with logged user', () => {
        const tripService = new TripServiceOverload();
        const alice = new User();
        const bob = new User();
        const carol = new User();
        bob.addFriend(carol);
        bob.addFriend(alice);

        const tripToLondon = new Trip();
        tripService.setTripList([tripToLondon]);
        
        tripService.setLoggedUser(alice);

        expect(tripService.getTripsByUser(bob)).toEqual([tripToLondon]);
    });
});
