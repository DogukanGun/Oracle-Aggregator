import redstone from 'redstone-api';

interface PriceData {
  timestamp: number;
  value: number;
}

export type SummaryResponse = {
  averagePrice: number,
  priceChangePercentage: number,
  maxPrice: number,
  minPrice: number,
}

export const getAveragePrice = async (token: string, startDate: string, endDate: string, limit: number): Promise<number> => {
  const prices: PriceData[] = await redstone.getHistoricalPrice(token, {
    startDate,
    endDate,
    limit,
    interval: 3600000, // Interval of one hour
  });

  const total = prices.reduce((sum, price) => sum + price.value, 0);
  return total / prices.length;
};

export const getPriceChange = async (token: string, startDate: string, endDate: string, limit: number): Promise<number> => {
  const prices: PriceData[] = await redstone.getHistoricalPrice(token, {
    startDate,
    endDate,
    limit,
    interval: 3600000,
  });

  const startPrice = prices[0]?.value ?? 0;
  const endPrice = prices[prices.length - 1].value;
  return ((endPrice - startPrice) / startPrice) * 100;
};

export const getMaxPrice = async (token: string, startDate: string, endDate: string, limit: number): Promise<number> => {
  const prices: PriceData[] = await redstone.getHistoricalPrice(token, {
    startDate,
    endDate,
    limit,
    interval: 3600000,
  });

  return Math.max(...prices.map(price => price.value));
};

export const getMinPrice = async (token: string, startDate: string, endDate: string, limit: number): Promise<number> => {
  const prices: PriceData[] = await redstone.getHistoricalPrice(token, {
    startDate,
    endDate,
    limit,
    interval: 3600000,
  });

  return Math.min(...prices.map(price => price.value));
};

export const getPricesSummary = async (token: string, startDate: string, endDate: string, limit: number): Promise<any> => {
  const [average, change, max, min] = await Promise.all([
    getAveragePrice(token, startDate, endDate, limit),
    getPriceChange(token, startDate, endDate, limit),
    getMaxPrice(token, startDate, endDate, limit),
    getMinPrice(token, startDate, endDate, limit),
  ]);

  return {
    averagePrice: average,
    priceChangePercentage: change,
    maxPrice: max,
    minPrice: min,
  } as SummaryResponse;
};
