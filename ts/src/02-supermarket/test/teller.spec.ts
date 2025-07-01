import { Product } from "../src/model/Product";
import { ProductUnit } from "../src/model/ProductUnit";
import { ShoppingCart } from "../src/model/ShoppingCart";
import { SpecialOfferType } from "../src/model/SpecialOfferType";
import { Teller } from "../src/model/Teller";
import { FakeCatalog } from "./FakeCatalog";

describe('Teller', () => {
    it('should return 0 when no product is added', () => {
        const teller = new Teller(new FakeCatalog());
        const cart = new ShoppingCart();

        const receipt = teller.checksOutArticlesFrom(cart);

        expect(receipt.getTotalPrice()).toBe(0);
    });

    it('should return the correct price when one product is added', () => {
        const catalog = new FakeCatalog();
        const apples = new Product('apples', ProductUnit.Kilo);
        catalog.addProduct(apples, 1.99);
        const teller = new Teller(catalog);
        const cart = new ShoppingCart();
        cart.addItemQuantity(apples, 2.5);

        const receipt = teller.checksOutArticlesFrom(cart);

        expect(receipt.getTotalPrice()).toBeCloseTo(1.99 * 2.5);
    });

    it('should apply discount if any', () => {
        const catalog = new FakeCatalog();
        const toothbrush = new Product('toothbrush', ProductUnit.Each);
        catalog.addProduct(toothbrush, 1);
        const teller = new Teller(catalog);
        teller.addSpecialOffer(SpecialOfferType.TenPercentDiscount, toothbrush, 10);
        const cart = new ShoppingCart();
        cart.addItemQuantity(toothbrush, 2);

        const receipt = teller.checksOutArticlesFrom(cart);

        expect(receipt.getTotalPrice()).toBeCloseTo(1 * 0.9 * 2);
    });

    it('should not manage 10% discount if not product is not added to basket', () => {
        const catalog = new FakeCatalog();
        const toothbrush = new Product('toothbrush', ProductUnit.Each);
        const apples = new Product('apples', ProductUnit.Kilo);
        catalog.addProduct(toothbrush, 1);
        catalog.addProduct(apples, 2.99);

        const teller = new Teller(catalog);
        teller.addSpecialOffer(SpecialOfferType.TenPercentDiscount, toothbrush, 10);
        
        const cart = new ShoppingCart();
        cart.addItemQuantity(apples, 2.5);

        const receipt = teller.checksOutArticlesFrom(cart);

        expect(receipt.getTotalPrice()).toBeCloseTo(2.99 * 2.5);
    })


    it('should apply three for 2 offer even if items are added separately', () => {
        const catalog = new FakeCatalog();
        const toothbrush = new Product('toothbrush', ProductUnit.Each);
        catalog.addProduct(toothbrush, 2);
        const teller = new Teller(catalog);
        teller.addSpecialOffer(SpecialOfferType.ThreeForTwo, toothbrush, 2);
        const cart = new ShoppingCart();
        cart.addItemQuantity(toothbrush, 1);
        cart.addItemQuantity(toothbrush, 1);
        cart.addItemQuantity(toothbrush, 1);

        const receipt = teller.checksOutArticlesFrom(cart);

        expect(receipt.getTotalPrice()).toBe(2 * 2);
    });

    // TODO : Several products
    // TODO for refactoring : rename TenPercentDiscount
    // TODO : Test other rules
})