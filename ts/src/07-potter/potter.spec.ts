import { FIVE_BOOKS_DISCOUNT, FOUR_BOOKS_DISCOUNT, PotterTeller, SINGLE_BOOK_PRICE, THREE_BOOKS_DISCOUNT, Tome, TWO_BOOKS_DISCOUNT } from "./potter";

describe('Potter kata', () => {
    let teller: PotterTeller;

    beforeEach(() => {
        teller = new PotterTeller();
    });
    
    it('should return 0 for an empty basket', () => {
        expect(teller.price([])).toBe(0);
    });

    it('should return 8 euro for one book', () => {
        expect(teller.price([1])).toBe(SINGLE_BOOK_PRICE);
    });

    it('should return 8 euros for each similar book', () => {
        expect(teller.price([1, 1])).toBe(2 * SINGLE_BOOK_PRICE);
    });

    it('should compute a 5% discount for two different books', () => {
        expect(teller.price([1, 2])).toBe(2*SINGLE_BOOK_PRICE*(1 - TWO_BOOKS_DISCOUNT));
    });

    it('should compute a 10% discount for three different books', () => {
        expect(teller.price([1, 2, 3])).toBe(3*SINGLE_BOOK_PRICE*(1 - THREE_BOOKS_DISCOUNT));
    });

    it('should compute a 20% discount for four different books', () => {
        expect(teller.price([1, 2, 3, 4])).toBe(4*SINGLE_BOOK_PRICE*(1 - FOUR_BOOKS_DISCOUNT));
    });

    it('should compute a 25% discount for all 5 tomes', () => {
        expect(teller.price([1, 2, 3, 4, 5])).toBe(5*SINGLE_BOOK_PRICE*(1 - FIVE_BOOKS_DISCOUNT));
    });

    it('should work for multiple piles', () => {
        const books: Tome[] = [1, 2, 3, 1 ,2];
        expect(teller.price(books)).toBe(3*SINGLE_BOOK_PRICE*(1-THREE_BOOKS_DISCOUNT) + 2*SINGLE_BOOK_PRICE*(1-TWO_BOOKS_DISCOUNT));
    });

    it('should favor piles of 4 books', () => {
        const books: Tome[] = [1, 2, 3, 4, 5, 2, 3, 4];
        expect(teller.price(books)).toBe(4*SINGLE_BOOK_PRICE*(1-FOUR_BOOKS_DISCOUNT)*2);
    });

    it('should handle piles of 5 books', () => {
        const books: Tome[] = [1, 2, 3, 4, 5, 5, 2, 3, 4];
        expect(teller.price(books)).toBe(4*SINGLE_BOOK_PRICE*(1-FOUR_BOOKS_DISCOUNT) + 5* SINGLE_BOOK_PRICE*(1-FIVE_BOOKS_DISCOUNT));
    });
})