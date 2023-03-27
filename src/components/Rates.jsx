import axios from 'axios';
import { useState, useEffect } from 'react';

const Rates = () => {
	const [rateData, setRateData] = useState([]);
	const [usdRate, setUsdRate] = useState(0);
	const [gbpRate, setGbpRate] = useState(0);
	const [eurRate, setEurRate] = useState(0);
	const [dataDate, setDataDate] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [rateList, setRateList] = useState([]);
	const [direction, setDirection] = useState('Ascending Length');

	const fetchRates = async () => {
		//function to obtain data drom API
		setLoading(true);
		setError(null);
		const rateUrl = 'https://api.coindesk.com/v1/bpi/currentprice.json';

		await axios
			.get(rateUrl)
			.then(({ data }) => {
				//set states based on data received
				setRateData(data);
				setUsdRate(data.bpi.USD);
				setGbpRate(data.bpi.GBP);
				setEurRate(data.bpi.EUR);
				setDataDate(data.time.updatedISO);
				setRateList([
					data.bpi.USD.rate_float,
					data.bpi.GBP.rate_float,
					data.bpi.EUR.rate_float,
				]);
			})
			.catch((error) => {
				setError(error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const sortRates = () => {
		if (direction === 'Ascending Length') {
			rateList.sort((a, b) => a - b); //ascending order

			setDirection('Descending Length');
		} else {
			rateList.sort((a, b) => b - a); //descending order

			setDirection('Ascending Length');
		}

		setRateList(rateList); //set to sorted rates
	};

	useEffect(() => {
		//sort and fetch rates once component loads
		fetchRates();
		sortRates();
	}, []);

	const curDate = new Date(dataDate); //data object used to convert UTC to local time

	return (
		<div>
			{!!error && <pre>{JSON.stringify(error, 0, 1)}</pre>}
			{!!loading && <p>Loading</p>}

			{rateData !== null ? ( //check if data is null using ternary operator
				<div>
					<button onClick={fetchRates} className="button">
						{' '}
						Refresh Rates
					</button>
					<p>Data Date (Local): {curDate.toString()}</p>
					<p>Data Date (UTC): {curDate.toUTCString()}</p>
					<br />
					<button onClick={sortRates} className="button">
						Click to Sort Rates by:
					</button>{' '}
					<small>
						<p>{direction}</p>
					</small>
					{rateList.map(
						(
							r //map rate data to screen
						) => (
							<div key={r.id}>
								<div>
									{r == usdRate.rate_float ? (
										<p>
											{' '}
											1 BTC is ${usdRate.rate} USD, 1 USD to BTC is{' '}
											{(1 / usdRate.rate_float).toFixed(6)}{' '}
										</p>
									) : r == gbpRate.rate_float ? (
										<p>
											{' '}
											1 BTC is €{gbpRate.rate} GBP, 1 GBP to BTC is{' '}
											{(1 / gbpRate.rate_float).toFixed(6)}
										</p>
									) : (
										<p>
											1 BTC is £{eurRate.rate} EUR, 1 EUR to BTC is{' '}
											{(1 / eurRate.rate_float).toFixed(6)}
										</p>
									)}
								</div>
							</div>
						)
					)}
				</div>
			) : null}
		</div>
	);
};

export default Rates;
