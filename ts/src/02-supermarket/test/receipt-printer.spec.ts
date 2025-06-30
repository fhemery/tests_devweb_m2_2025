import { Receipt } from "../src/model/Receipt";
import { ReceiptPrinter } from "../src/ReceiptPrinter";
import { Product } from "../src/model/Product";
import { ProductUnit } from "../src/model/ProductUnit";

describe('ReceiptPrinter', () => {
    it('should print an empty receipt', () => {
        const receipt = new Receipt();
        const receiptPrinter = new ReceiptPrinter();
        const result = receiptPrinter.printReceipt(receipt);
        expect(result).toMatchSnapshot();
        
        // Other way (a bit trickier as soon as there will be)
        expect(result).toBe("\nTotal:                              0.00");
    });

    it('should print a receipt with one item', () => {
        const receipt = new Receipt();
        receipt.addProduct(new Product('apples', ProductUnit.Kilo), 2.5, 1.99, 2.5 * 1.99);
        const receiptPrinter = new ReceiptPrinter();
        const result = receiptPrinter.printReceipt(receipt);
        expect(result).toMatchSnapshot();
    });
})