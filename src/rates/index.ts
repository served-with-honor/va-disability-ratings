import rates2022 from "./varates2022.json";
import rates2021 from "./varates2021.json";
import rates2020 from "./varates2020.json";
import rates2019 from "./varates2019.json";
import rates2018 from "./varates2018.json";
import rates2017 from "./varates2017.json";
import rates2016 from "./varates2016.json";
import rates2015 from "./varates2015.json";
import rates2014 from "./varates2014.json";
import rates2013 from "./varates2013.json";
import rates2012 from "./varates2012.json";
import rates2011 from "./varates2011.json";
import rates2010 from "./varates2010.json";
import rates2009 from "./varates2009.json";
import rates2008 from "./varates2008.json";
import rates2007 from "./varates2007.json";
import rates2006 from "./varates2006.json";
import rates2005 from "./varates2005.json";
import rates2004 from "./varates2004.json";
import rates2003 from "./varates2003.json";
import rates2002 from "./varates2002.json";
import rates2001 from "./varates2001.json";
import rates2000 from "./varates2000.json";
import rates1999 from "./varates1999.json";

interface IRate {
    "30": number;
    "40": number;
    "50": number;
    "60": number;
    "70": number;
    "80": number;
    "90": number;
    "100": number;
}

interface IRate1 extends IRate {
  "10"?: number;
  "20"?: number
}

export interface IRates {
  veteran: IRate1;
  withspouseonly: IRate;
  withspouseandoneparent: IRate;
  withspouseandtwoparents: IRate;
  withoneparent: IRate;
  withtwoparents: IRate;
  withspouseandchild: IRate;
  withchildonly: IRate;
  withspouseoneparentandchild: IRate;
  withspousetwoparentsandchild: IRate;
  withoneparentandchild: IRate;
  withtwoparentsandchild: IRate;
  aaspouse: IRate;
  additionalchild: IRate;
  additionalchildover18: IRate;
}

interface snl {
  [key: string]: IRates
}
const vaRates: snl  = {
  latest: rates2022,
  '2022': rates2022,
  '2021': rates2021,
  '2020': rates2020,
  '2019': rates2019,
  '2018': rates2018,
  '2017': rates2017,
  '2016': rates2016,
  '2015': rates2015,
  '2014': rates2014,
  '2013': rates2013,
  '2012': rates2012,
  '2011': rates2011,
  '2010': rates2010,
  '2009': rates2009,
  '2008': rates2008,
  '2007': rates2007,
  '2006': rates2006,
  '2005': rates2005,
  '2004': rates2004,
  '2003': rates2003,
  '2002': rates2002,
  '2001': rates2001,
  '2000': rates2000,
  '1999': rates1999,
};

export default vaRates;
