import { GildedRose, Item } from './gilded-rose';

describe('Gilded Rose', () => {
  describe('General Item', () => {
    it('should decrease quality by 1 for normal items', () => {
      const gildedRose = new GildedRose([new Item('Normal Item', 10, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(19);
      expect(items[0].sellIn).toBe(9);
    });

    it('should decrease quality twice as fast after sell by date', () => {
      const gildedRose = new GildedRose([new Item('Normal Item', 0, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(18);
    });

    it('should not decrease quality below 0', () => {
      const gildedRose = new GildedRose([new Item('Normal Item', 10, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });
  });

  describe('Aged Brie', () => {
    it('should increase quality as it gets older', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 10, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(21);
      expect(items[0].sellIn).toBe(9);
    });

    it('should increase quality by 2 after sell by date', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 0, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(22);
    });

    it('should not increase quality above 50', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 10, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50);
    });
  });

  describe('Sulfuras', () => {
    it('should never decrease in quality', () => {
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 10, 80)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(80);
      expect(items[0].sellIn).toBe(10); // SellIn should not decrease
    });
  });

  describe('Backstage Passes', () => {
    it('should increase quality by 1 when more than 10 days left', () => {
      const gildedRose = new GildedRose([
        new Item('Backstage passes to a TAFKAL80ETC concert', 11, 20)
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(21);
    });

    it('should increase quality by 2 when 10 days or less left', () => {
      const gildedRose = new GildedRose([
        new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(22);
    });

    it('should increase quality by 2 until 6 days left', () => {
        const gildedRose = new GildedRose([
          new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(22);
      });

    it('should increase quality by 3 when 5 days or less left', () => {
      const gildedRose = new GildedRose([
        new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20)
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(23);
    });

    it('should drop quality to 0 after concert', () => {
      const gildedRose = new GildedRose([
        new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20)
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });

    it('should not increase quality above 50', () => {
      const gildedRose = new GildedRose([
        new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49)
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50);
    });
  });

  describe('Multiple Items', () => {
    it('should update multiple items correctly', () => {
      const items = [
        new Item('Normal Item', 10, 20),
        new Item('Aged Brie', 2, 0),
        new Item('Sulfuras, Hand of Ragnaros', 0, 80),
        new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49)
      ];
      
      const gildedRose = new GildedRose(items);
      const updatedItems = gildedRose.updateQuality();
      
      expect(updatedItems[0].quality).toBe(19); // Normal item
      expect(updatedItems[1].quality).toBe(1);  // Aged Brie
      expect(updatedItems[2].quality).toBe(80); // Sulfuras
      expect(updatedItems[3].quality).toBe(50); // Backstage pass (capped at 50)
    });
  });
});
