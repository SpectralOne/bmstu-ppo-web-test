import { Config } from './types'
import { getToken } from './utils';

const config: Config = {
  api_url: process.env.REACT_APP_API || 'http://localhost:3000/api/v1',
  // api_url: process.env.REACT_APP_API || 'https://team-gen.com/api/v1',
  version: process.env.REACT_APP_VERSION || "Regular version",
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
