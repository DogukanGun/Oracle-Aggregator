import redstone from 'redstone-api';

interface PriceData {
  timestamp: number;
  value: number;
}

export const getAveragePrice = async (token: string, startDate: string, endDate: string): Promise<number> => {
  const startPrice: PriceData = await redstone.getHistoricalPrice(token, { startDate: startDate });
  const endPrice: PriceData = await redstone.getHistoricalPrice(token, { endDate: endDate });
  return (startPrice.value + endPrice.value) / 2;
};

export const getPriceChange = async (token: string, startDate: string, endDate: string): Promise<number> => {
  const startPrice: PriceData = await redstone.getHistoricalPrice(token, { startDate: startDate });
  const endPrice: PriceData = await redstone.getHistoricalPrice(token, { endDate: endDate });
  return ((endPrice.value - startPrice.value) / startPrice.value) * 100;
};

export const getMaxPrice = async (token: string, startDate: string, endDate: string): Promise<number> => {
  const startPrice: PriceData = await redstone.getHistoricalPrice(token, { startDate: startDate });
  const endPrice: PriceData = await redstone.getHistoricalPrice(token, { endDate: endDate });
  return Math.max(startPrice.value, endPrice.value);
};

export const getMinPrice = async (token: string, startDate: string, endDate: string): Promise<number> => {
  const startPrice: PriceData = await redstone.getHistoricalPrice(token, { startDate: startDate });
  const endPrice: PriceData = await redstone.getHistoricalPrice(token, { endDate: endDate });
  return Math.min(startPrice.value, endPrice.value);
};

export const getPricesSummary = async (token: string, startDate: string, endDate: string): Promise<any> => {
  const [average, change, max, min] = await Promise.all([
    getAveragePrice(token, startDate, endDate),
    getPriceChange(token, startDate, endDate),
    getMaxPrice(token, startDate, endDate),
    getMinPrice(token, startDate, endDate),
  ]);

  return {
    averagePrice: average,
    priceChangePercentage: change,
    maxPrice: max,
    minPrice: min,
  };
};
