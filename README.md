# Profit Prophet Application Back End

Nest.js application spiced up with some machine learning, to predict your favorite stock's price.

`GET` requests to `stockhistory/:ticker` return the stock's history in a JSON format.

`stockmeta/page` returns stocks' metadata in a JSON format according to the page size. The page size is 5 by default.

`stockmeta/next` returns the next page of the stocks' metadata. `stockmeta/prev` returns the previous page.

`stockmeta/search/:ticker` returns the metadata of the stock with the given ticker.

Triggering the `/api/prediction/:ticker` endpoint the backend runs a python script which loads a saved model for predicting stock prices. The script returns the last element of the prediction list, the backend captures it and sends back to the caller.

A `POST` request to `/api/auth/` with a `UserInterface` entity in the body authenticates the user with Firebase.

Requests to `operation/favorite/add/:ticker` and `operation/favorite/remove/:ticker` add or remove the ticker from the user's favorite list.

Dataset dowloaded from: https://www.kaggle.com/datasets/jacksoncrow/stock-market-dataset
