import { ConversionRateApi, IConversionRateApi } from "./external/conversion-rate-api";
import { CurrencyConverter } from "./currency-converter";
import { Currency } from "./model/currency";
import { Money } from "./model/money";
import { CurrencyIsoCode } from "./external/currency-iso-code";

class FakeConversionRateApi implements IConversionRateApi {
  private rates = new Map<string, number>();
  calls: string[] = [];
  
  getRate(source: CurrencyIsoCode, target: CurrencyIsoCode): number {
    this.calls.push(`${source};${target}`);
    const rate = this.rates.get(`${source};${target}`);
    if (rate) {
      return rate;
    }
    throw new Error('Not implemented');
  }

  withRate(source: CurrencyIsoCode, target: CurrencyIsoCode, rate: number): FakeConversionRateApi {
    this.rates.set(`${source};${target}`, rate);
    return this;
  }

}

describe("CurrencyConverter", function () {
  it("is initialized", () => {
    const converter = new CurrencyConverter(new ConversionRateApi());
    expect(converter).toBeTruthy();
  });
  
  describe('when using a mock', () => {
    let api: ConversionRateApi;
    let getRate: jest.Mock;
    beforeEach(() => {
      //api = new ConversionRateApi();
      getRate = jest.fn();
      api = {
        getRate,
      };
    });

    it('should sum money', () => {
      getRate.mockReturnValue(2);

      const converter = new CurrencyConverter(api);
      const result = converter.sum(Currency.Euro, new Money(2, Currency.Dollar));
      
      expect(result).toEqual(new Money(4, Currency.Euro));
    });

    it('should sum several money with different currencies', () => {
      getRate.mockImplementation((from) => {
        if (from === CurrencyIsoCode.USD) {
          return 2;
        }
        if (from === CurrencyIsoCode.GBP) {
          return 1.5;
        }
        throw new Error('Not implemented');
      });

      const converter = new CurrencyConverter(api);
      const result = converter.sum(Currency.Euro, new Money(2, Currency.Dollar), new Money(2, Currency.Pound));
      
      expect(result).toEqual(new Money(2*2 + 2*1.5, Currency.Euro));
    });

    it('should only call once per currency', () => {
      getRate.mockImplementation((from) => {
        if (from === CurrencyIsoCode.USD) {
          return 2;
        }
        throw new Error('Not implemented');
      });

      const converter = new CurrencyConverter(api);
      const result = converter.sum(Currency.Euro, new Money(2, Currency.Dollar), new Money(2, Currency.Dollar));
      
      expect(result).toEqual(new Money(2*2 + 2*2, Currency.Euro));
      expect(api.getRate).toHaveBeenCalledTimes(1);
    })
  });

  describe('when using fakes', () => {
    let api: FakeConversionRateApi;
    beforeEach(() => {
      api = new FakeConversionRateApi();
    });
    it('should sum money', () => {
      api.withRate(CurrencyIsoCode.USD, CurrencyIsoCode.EUR, 2);
      const converter = new CurrencyConverter(api);
      const result = converter.sum(Currency.Euro, new Money(2, Currency.Dollar));
      
      expect(result).toEqual(new Money(4, Currency.Euro));
    });

    it('should sum several money with different currencies', () => {
      api.withRate(CurrencyIsoCode.USD, CurrencyIsoCode.EUR, 2)
      .withRate(CurrencyIsoCode.GBP, CurrencyIsoCode.EUR, 1.5);
      const converter = new CurrencyConverter(api);
      const result = converter.sum(Currency.Euro, new Money(2, Currency.Dollar), new Money(2, Currency.Pound));
      
      expect(result).toEqual(new Money(2*2 + 2*1.5, Currency.Euro));
    });

    it('should only call once per currency', () => {
      api.withRate(CurrencyIsoCode.USD, CurrencyIsoCode.EUR, 2);
      const converter = new CurrencyConverter(api);
      const result = converter.sum(Currency.Euro, new Money(2, Currency.Dollar), new Money(2, Currency.Dollar));
      
      expect(result).toEqual(new Money(2*2 + 2*2, Currency.Euro));
      expect(api.calls).toHaveLength(1);
    })
  })
});
