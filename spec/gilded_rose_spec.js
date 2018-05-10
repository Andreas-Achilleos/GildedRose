describe("Gilded Rose", function() {
  it("An item has a name value", function() {
    const gildedRose = new Shop([new Item("Elixir", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("Elixir");
  });

  //At the end of each day our system lowers value for sellIn
  it("Should lower sellIn value", function() {
    const gildedRose = new Shop([new Item("Elixir", 3, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(2);
  });

  //At the end of each day our system lowers value for quality
  it("Should lower quality value", function() {
    const gildedRose = new Shop([new Item("Elixir", 3, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(9);
  });

  //Once the sell by date has passed, Quality degrades twice as fast
  it("If sellIn = 0 Quality degrades x2", function() {
    const gildedRose = new Shop([new Item("Elixir", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(8);
  });

  // The Quality of an item is never negative
  it("Quality of item is never negative", function() {
    const gildedRose = new Shop([new Item("Elixir", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).not.toEqual(-1);
  });

  // The Quality of an item is never more than 50
  it("Quality of item is never more than 50", function() {
    const gildedRose = new Shop([new Item("Elixir", 10, 51)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(50);
  });
});

describe("Aged Brie", function() {
  // "Aged Brie" actually increases in Quality the older it gets
  it("Aged Brie Increases in quality as sellIn decreases", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 2, 3)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(4);
  });
});

describe("Sulfuras, Hand of Ragnaros", function() {
  //"Sulfuras", being a legendary item, never has to be sold or decreases in Quality
  it("Sulfuras never decrease in sellIn", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 50, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(50);
  });

  //"Sulfuras", being a legendary item, never has to be sold or decreases in Quality
  it("Sulfuras never decrease in quality", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 50, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(50);
  });
});

describe("Backstage passes to a TAFKAL80ETC concert", function() {
  // "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
  // 	Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
  // 	Quality drops to 0 after the concert
  it("Backstage pass increases in quality by 1 ... sellIn = > 10", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 15, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(50);
  });

  it("Backstage pass increases in quality by 2 ... sellIn = <= 10", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 9, 48)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(50);
  });

  it("Backstage pass increases in quality by 3 ... sellIn = <= 5", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 4, 47)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(50);
  });
});
