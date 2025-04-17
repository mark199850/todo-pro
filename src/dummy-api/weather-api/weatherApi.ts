import { weatherData, type Weather } from './db'

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

export const weatherApi = {
  async getWeather(date: string): Promise<Weather> {
    await delay(500)
    return weatherData.filter((wd) => wd.date === date.toString())[0]
  },
}
