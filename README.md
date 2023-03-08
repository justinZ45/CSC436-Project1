# CSC436-Project1

## Task:

Using the public API https://api.coindesk.com/v1/bpi/currentprice.json

Use the Vite starter + styling of your choosing, i.e., Bootstrap, Tailwind, custom, whichever you are comfortable with, and do the following in a react application:

Have a navbar with sections:

1. Current Conversions Rates
  * Display the conversion rate in both directions
    * $ (USD) to BTC, 1 BTC to $
    * 1 € (EUR) to BTC, 1 BTC to €
    * £ (GBP) to BTC, 1 BTC to £
1. Conversions
  * Allow the user to sort the exchange rates (highest number of fiat to BTC to lowest number of fiat to BTC and reverse) by clicking a button
  * Create
    * a single SELECT dropdown with selections of Euro, GBP, and USD
    * an input
    * convert the selected currency and the amount to its value in BTC.
Always visible, regardless of the section displayed, in the app should be the following:

  * The data date (hint it comes back from the API) should always be visible to the user. Let’s see if you can convert the UTC time to the current browser’s time zone and output both times.
  * Allow a user to refetch the rate; limit them to once per 5 minutes (that should persist in refreshes; that is, if a user hits refresh, they should not be able to hit refresh again (and be warned if they try) in the same browser (assuming they don’t clear their local data manually) for 5 minutes, regardless if they refresh the browser.

## Screenshots

### Rates
<img width="85%" alt="Screen Shot 2023-03-08 at 3 12 00 PM" src="https://user-images.githubusercontent.com/92334995/223838168-d872e539-90a3-48bf-b23b-26f379b27a18.png">

### Conversions

<img width="85%" alt="Screen Shot 2023-03-08 at 3 12 27 PM" src="https://user-images.githubusercontent.com/92334995/223838319-2fe4b826-acec-4fb4-bb67-1e6a2bfe002c.png">
