## How to setup
Clone this repository using 'git clone'
Do 'npm install' to install all the dependencies
Run the development server using 'npm run dev'
Open browser and run 'https://localhost:3000'

## Routes
'/' for home if user present then login page else signup page
'/login' for login page
'/signup' for signup page
'/dashboard' for Stocks table Note: This is a protected route and can't access if userdata is not available
'/dashboard/${symbol}' for candlestick chart page Note: This is a protected route and can't access if userdata is not available

##Functionality
● The user will be able to log in to the application using Firebase 
● The user should be able to search for stocks by symbol and add them to their portfolio. (Extra functionalities can be added like removing stocks from portfolio, showing portfolio in different page. Right now user can only add the stocks in portfolio and can see how many stocks have been added on cart logo, can see the stocks in console)
● The stock data will be retrieved in real-time using REST 
● The stock data should be displayed in a candle graph format, showing the opening, closing, highest and lowest price of the stock for a given time interval and will be updated every 5 sec
● The user will be able to select the stock symbol and the time interval for the graph.
● The user will be able to zoom in and out of the graph to view different time intervals
● The graph will update in real-time as new data is received
● The application is responsive and accessible, using Tailwind CSS for styling
● Used Next.js to handle server-side rendering and routing.


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
