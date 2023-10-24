# PRofit Prophet Application Back End

NestJS application spiced up with some machine learning, to predict your favorite stock's price. 

Triggering the `/api/prediction/:ticker` endpoint the backend runs a python script which loads a saved model for predicting stock prices. The script returns the last element of the prediction list, the backend captures it and sends back to the caller.

Dataset dowloaded from: https://www.kaggle.com/datasets/jacksoncrow/stock-market-dataset
