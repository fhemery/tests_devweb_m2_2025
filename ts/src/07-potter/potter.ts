export type Tome = 1 | 2 | 3 | 4 | 5;

export const SINGLE_BOOK_PRICE = 8;
export const TWO_BOOKS_DISCOUNT = 0.05;
export const THREE_BOOKS_DISCOUNT = 0.10;
export const FOUR_BOOKS_DISCOUNT = 0.20;
export const FIVE_BOOKS_DISCOUNT = 0.25;

const tomePrices = [1, 1, 1 - TWO_BOOKS_DISCOUNT, 1-THREE_BOOKS_DISCOUNT, 1-FOUR_BOOKS_DISCOUNT, 1-FIVE_BOOKS_DISCOUNT];

class Basket {
    tomes: Record<Tome, number> = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};

    constructor(books:Tome[]) {
        for (const book of books) {
            this.tomes[book]++;
        }
    }

    makePiles(): number[] {
        const tomesCountOrdered = Object.values(this.tomes).sort((a, b) => b - a).filter(t => t> 0);

        let currentPiles: number[] = [];
        for (const tomes of tomesCountOrdered) {
            for (let i = 0; i < tomes; ++i) {
                if (currentPiles[i]) {
                    currentPiles[i]++;
                } else {
                    currentPiles.push(1);
                }
            }
            // We want to put the pile of 4 at the end
            const pilesOfFour = currentPiles.filter(p => p === 4);
            currentPiles = currentPiles.filter(p => p !== 4);
            currentPiles.sort((a, b) => b - a);
            currentPiles.push(...pilesOfFour);
        }
        
        return currentPiles;
    }

    pricePile(numberOfBooksInThePile: number): number {
        return numberOfBooksInThePile * SINGLE_BOOK_PRICE * tomePrices[numberOfBooksInThePile];
    }
}

export class PotterTeller {
    price(books: Tome[]): number {
        const basket = new Basket(books);
        const piles = basket.makePiles();
        return piles.reduce((acc, p) => acc + basket.pricePile(p), 0);
    }
}