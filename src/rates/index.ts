import type { IRates } from '../types';
import varates2024 from './varates2024';
import varates2023 from './varates2023';
import varates2022 from './varates2022';
import varates2021 from './varates2021';
import varates2020 from './varates2020';

const vaRates : { [key : string] : IRates } = {
  latest: varates2024,
  2024: varates2024,
  2023: varates2023,
  2022: varates2022,
  2021: varates2021,
  2020: varates2020,
};

export default vaRates;
