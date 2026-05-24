# MyStore

MyStore is a single-page Angular ecommerce application. Users can browse products loaded from a JSON data file with `HttpClient`, view product details, add items in selected quantities to a shared shopping cart, remove or update cart items, and submit a validated checkout form to reach an order confirmation page.

## Features

- Product list with images, names, prices, quantities, and add-to-cart actions
- Product detail routes with photo, description, price, and cart controls
- Shared cart state through an Angular service
- Cart page with quantity editing, item removal, empty-cart messaging, and total cost
- Template-driven checkout form with required field, minimum length, and credit-card validation
- Order confirmation route after successful checkout

## Install and Run

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
ng serve
```

Open `http://localhost:4200/` in your browser.

## Project Structure

- `src/app/models`: TypeScript models for products, cart items, and orders
- `src/app/services`: Product data and cart state services
- `src/app/components`: Product list, product item, detail, cart, and confirmation components
- `src/assets/data.json`: Product data loaded by `ProductService`
