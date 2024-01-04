import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getAllCountries, getCountryByName } from "../api/country-api";
import DataPoint from "../components/data-point";
import * as Select from "@radix-ui/react-select";
import { MagnifyingGlassIcon, TriangleDownIcon } from "@radix-ui/react-icons";
import qs from "query-string";

function Home() {
  const [countries, setCountries] = useState(null);
  const [searchedCountries, setSearchedCountries] = useState(null);
  const [searchParams] = useSearchParams();

  const { region: selectedRegion, q: searchedCountry } = qs.parse(searchParams.toString());

  const isSearching = Boolean(searchedCountry?.length);

  const countriesBySearch =
    isSearching && searchedCountries?.length > 0 ? searchedCountries : countries;

  const filteredCountries = selectedRegion
    ? countriesBySearch?.filter(
      (country) => country.region.toLowerCase() === selectedRegion?.toLowerCase()
    )
    : countriesBySearch;

  useEffect(() => {
    getAllCountries().then(setCountries).catch(console.log);
  }, []);

  useEffect(() => {
    if (!searchedCountry || isSearching <= 0) return;
    getCountryByName(searchedCountry).then(setSearchedCountries).catch(console.log);
  }, [searchedCountry]);

  return (
    <div className="">
      <div className="mb-8 w-full flex flex-col gap-8  md:flex-row justify-between">
        <CountrySearch searchedCountry={searchedCountry} />
        <RegionSelect selectedRegion={selectedRegion} />
      </div>
      <ul className="grid sm:grid-cols-2 gap-4 lg:grid-cols-3">
        {filteredCountries === undefined ? (
          <>
            <CountryCardSkeleton />
            <CountryCardSkeleton />
            <CountryCardSkeleton />
            <CountryCardSkeleton />
          </>
        ) : (
          filteredCountries?.map((country) => {
            return (
              <>
                <li
                  key={country.name.common}
                  className="flex flex-col bg-white dark:bg-darkElement"
                >
                  <div className="h-1/2">
                    <img
                      src={country.flags.png}
                      alt={country.name.common}
                      className="bg-cover h-full w-full"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="font-bold text-xl mb-2">
                      <Link to={`country/${country.cca3.toLowerCase()}`}>
                        {country.name.common}
                      </Link>
                    </h2>
                    <DataPoint
                      property="Population"
                      value={Intl.NumberFormat("en-US").format(country.population)}
                    />
                    <DataPoint property="Region" value={country.region} />
                    <DataPoint property="Capital" value={country.capital} />
                  </div>
                </li>
              </>
            );
          })
        )}
      </ul>
    </div>
  );
}

export default Home;

const CountrySearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onSearch = (e) => {
    if (e.target.value) searchParams.set("q", e.target.value);
    else searchParams.delete("q");
    setSearchParams(searchParams);
  };

  return (
    <div className="w-full max-w-lg flex bg-white items-center shadow-md pl-8 gap-8 dark:bg-darkElement">
      <label htmlFor="search-country" className="sr-only">
        Search Country
      </label>
      <MagnifyingGlassIcon className="" />
      <input
        type="text"
        name="search-country"
        id="search-country"
        placeholder="Search for a country..."
        onChange={onSearch}
        className="border-none w-full p-4 bg-transparent dark:text-white text-baseInput"
      />
    </div>
  );
};

const RegionSelect = ({ selectedRegion }) => {
  const regions = ["Asia", "Africa", "Americas", "Europe", "Oceania"];
  const [searchParams, setSearchParams] = useSearchParams();

  const onSelect = (newValue) => {
    if (newValue) searchParams.set("region", newValue);
    else searchParams.delete("region");
    setSearchParams(searchParams);
  };

  return (
    <Select.Root value={selectedRegion} onValueChange={onSelect}>
      <Select.Trigger
        className="flex items-center justify-between gap-4 bg-white p-4 shadow-md min-w-48 bg-white dark:bg-darkElement"
        aria-label="select a region"
      >
        <Select.Value placeholder="Filter by Region">
          {!selectedRegion ? "Filter by Region" : selectedRegion}
        </Select.Value>
        <Select.Icon>
          <TriangleDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          className="bg-white dark:bg-darkElement shadow-md w-[--radix-select-trigger-width] max-h-[--radix-select-content-available-height]"
        >
          <Select.ScrollUpButton />
          <Select.Viewport className="w-full">
            {regions.map((region) => {
              return (
                <Select.Item
                  key={region}
                  value={selectedRegion === region ? undefined : region}
                  className="px-4 w-full py-2 text-baseText dark:text-white dark:data-[highlighted]:bg-zinc-500 
                  data-[highlighted]:bg-zinc-200
                  "
                >
                  <Select.ItemText>{region}</Select.ItemText>
                </Select.Item>
              );
            })}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

const CountryCardSkeleton = () => {
  return (
    <div className="ring-1 ring-gray-200 flex flex-col bg-white animate-pulse">
      <div className="h-40 w-full bg-stone-300"></div>
      <div className="p-4 space-y-2 ">
        <div className="h-4 w-2/3 bg-stone-300"></div>
        <div className="h-4 w-2/3 bg-stone-300"></div>
        <div className="h-4 w-2/3 bg-stone-300"></div>
      </div>
    </div>
  );
};
