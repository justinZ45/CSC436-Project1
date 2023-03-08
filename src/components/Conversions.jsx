import axios from "axios";
import { useState, useEffect } from "react";

const Conversions = () => {
  const [rateData, setRateData] = useState([]);
  const [usdRate, setUsdRate] = useState(0);
  const [gbpRate, setGbpRate] = useState(0);
  const [eurRate, setEurRate] = useState(0);
  const [currencyChoice, setCurrencyChoice] = useState("");
  const [search, setSearch] = useState("");
  const [convertedValue, setConvertedValue] = useState(0);
  const [dataDate, setDataDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currencyChoiceHandler = (e) => {
    //function to set user's choice of currency
    setCurrencyChoice(e.target.value);
  };

  const searchHandler = (e) => {
    //function to set user's input
    setSearch(parseInt(e.target.value));
    if (isNaN(search)) {
      //prevent NAN error
      setSearch(0);
    }
  };

  const convert = () => {
    //check user's choice and perform calculations to convert to BTC
    if (currencyChoice == "USD") {
      setConvertedValue((1 / usdRate.rate_float).toFixed(6) * search);
    } else if (currencyChoice == "GBP") {
      setConvertedValue((1 / gbpRate.rate_float).toFixed(6) * search);
    } else {
      setConvertedValue((1 / eurRate.rate_float).toFixed(6) * search);
    }
  };

  const fetchRates = async () => {
    //function to obtain data from API
    setLoading(true);
    setError(null);
    const rateUrl = "https://api.coindesk.com/v1/bpi/currentprice.json";

    await axios
      .get(rateUrl)
      .then(({ data }) => {
        //set all data from API
        setRateData(data);
        setUsdRate(data.bpi.USD);
        setGbpRate(data.bpi.GBP);
        setEurRate(data.bpi.EUR);
        setDataDate(data.time.updatedISO);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    //fetchrates when component is loaded
    fetchRates();
  }, []);

  const curDate = new Date(dataDate); //data object used to convert UTC to local time

  return (
    <div>
      {!!error && <pre>{JSON.stringify(error, 0, 1)}</pre>}
      {!!loading && <p>Loading</p>}

      {rateData !== null ? ( //check if data is null using ternary operator
        <div>
          <button onClick={fetchRates} className="button">
            {" "}
            Refresh Rates
          </button>
          <p>Data Date (Local): {curDate.toString()}</p>
          <p>Data Date (UTC): {curDate.toUTCString()}</p>
          <select
            className="form-select form-select-sm mb-3"
            value={currencyChoice}
            onChange={currencyChoiceHandler}
          >
            <option defaultValue={"Select a Currency"}>
              Select a Currency
            </option>
            <option>USD </option>
            <option>GBP</option>
            <option>EUR</option>
          </select>

          <label htmlFor="search" className="p">
            Enter a Currency Value:{" "}
          </label>
          <input //input for currency value entered by user
            type="text"
            name="search"
            onChange={searchHandler}
            value={search}
          />
          <button onClick={convert} className="button">
            Submit
          </button>
          <p>Converted Value is: {convertedValue} BTC</p>
        </div>
      ) : null}
    </div>
  );
};

export default Conversions;
