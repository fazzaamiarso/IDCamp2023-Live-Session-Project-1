import { Link, useNavigate, useParams } from "react-router-dom";
import { getBorderingCountries, getCountryByCode } from "../api/country-api";
import { useEffect, useState } from "react";
import DataPoint from "../components/data-point";

const CountryDetail = () => {
  const { code } = useParams();
  const [countryData, setCountryData] = useState(null);
  const [borders, setBorders] = useState(null);
  const navigate = useNavigate();

  if (!code) return null;

  useEffect(() => {
    getCountryByCode(code).then(setCountryData).catch(console.log);
  }, [code]);

  useEffect(() => {
    if (countryData?.borders) {
      getBorderingCountries(countryData.borders).then(setBorders);
    }
  }, [countryData?.borders]);

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="bg-white text-baseText dark:text-white dark:bg-darkElement shadow-md px-6 py-2 rounded-sm mb-16"
      >
        ← Back
      </button>
      {countryData === null ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-6 mb-8 lg:grid lg:grid-cols-2 lg:gap-20">
          <div className="mx-auto w-full">
            <img src={countryData.flags.png} alt={countryData.name.common} className="w-full" />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">{countryData.name.common}</h2>
            <div>
              <div className="lg:grid grid-cols-2 gap-8">
                <div className="mb-8 space-y-2">
                  <DataPoint
                    property="Native Name"
                    value={
                      countryData.name.nativeName[Object.keys(countryData.name.nativeName)[0]]
                        .official
                    }
                  />

                  <DataPoint
                    property="Population"
                    value={Intl.NumberFormat("en-US").format(countryData.population)}
                  />
                  <DataPoint property="Region" value={countryData.region} />
                  <DataPoint property="Sub Region" value={countryData.subregion} />
                  <DataPoint property="Capital" value={countryData.capital} />
                </div>
                <div className="space-y-2">
                  <DataPoint property="Top Level Domain" value={countryData.tld} />
                  <DataPoint
                    property="Currencies"
                    value={countryData.currencies[Object.keys(countryData.currencies)[0]].name}
                  />
                  <DataPoint
                    property="Languages"
                    value={Object.values(countryData.languages).join(", ")}
                  />
                </div>
              </div>
              {borders?.length ? (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Border Countries:</h3>
                  <ul className="flex flex-row gap-3 flex-wrap">
                    {borders.map((border) => (
                      <li key={border.name}>
                        <Link
                          to={`/country/${border.code}`}
                          className="shadow-md px-6 text-baseText dark:text-white bg-white dark:bg-darkElement p-2 inline-block"
                        >
                          {border.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryDetail;
