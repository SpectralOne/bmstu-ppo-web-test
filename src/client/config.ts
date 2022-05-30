import { Config } from './types'
import { getToken } from './utils';

const config: Config = {
  api_url: 'http://localhost:3000/api/v1',
  plant_per_page: 10,
  token: getToken(),
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
}

export default config
