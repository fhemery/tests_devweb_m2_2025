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

    hasTomes(): boolean {
        return this.getRemainingTomes() > 0;
    }

    getRemainingTomes(): number {
        return Object.values(this.tomes).filter(tome => tome > 0).length;
    }

    removeOneTome(): void {
        if(this.tomes[1] > 0) this.tomes[1]--;
        if(this.tomes[2] > 0) this.tomes[2]--;
        if(this.tomes[3] > 0) this.tomes[3]--;
        if(this.tomes[4] > 0) this.tomes[4]--;
        if(this.tomes[5] > 0) this.tomes[5]--;
    }
}

export class PotterTeller {
    price(books: Tome[]): number {
        const basket = new Basket(books);
        
        let total = 0;
        while(basket.hasTomes()) {
            const nbDifferentTomes = basket.getRemainingTomes();
            total += nbDifferentTomes * SINGLE_BOOK_PRICE * tomePrices[nbDifferentTomes];
            basket.removeOneTome();
        }
        return total;
    }
}