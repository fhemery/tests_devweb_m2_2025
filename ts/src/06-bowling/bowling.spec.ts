import {BowlingGame} from './bowling';

describe('Bowling game', () => {
    it('should return 0 if all frames are misses', () => {
        const game = new BowlingGame('-- -- -- -- -- -- -- -- -- --');
        
        const score = game.getScore();

        expect(score).toBe(0);
    });

    it('should return 10 points for a strike', () => {
        const game = new BowlingGame('-- -- X -- -- -- -- -- -- --');

        expect(game.getScore()).toBe(10);
    });

    it('should add the frame score together', () => {
        const game = new BowlingGame('-- -- X -- -- -- X -- -- --');

        expect(game.getScore()).toBe(20);
    });

    it('should add normal throws together', () => {
        const game = new BowlingGame('-- -- 12 -- -- -- 34 -- -- --');

        expect(game.getScore()).toBe(3 + 7);
    });

    it('should double the next two throws after a strike', () => {
        const game = new BowlingGame('-- X 12 -- -- -- -- -- -- --');

        expect(game.getScore()).toBe(13 + 3);
    })
})