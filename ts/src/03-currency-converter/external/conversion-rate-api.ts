/**
 * This class is provided by a third party and you cannot change it.
 */
import { CurrencyIsoCode } from "./currency-iso-code";

export interface IConversionRateApi {
  getRate(source: CurrencyIsoCode, target: CurrencyIsoCode): number;
}

export class ConversionRateApi implements IConversionRateApi {
  getRate(source: CurrencyIsoCode, target: CurrencyIsoCode): number {
    console.log(`Getting rate from ${source} to ${target}`);
    throw new Error(
      "401 - Unauthorized, IP not recognized. Are you trying to call us via a unit test?"
    );
  }
}
