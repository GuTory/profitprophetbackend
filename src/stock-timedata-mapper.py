import os
import csv
import json

# directory/folder path
dir_path = os.getcwd() + '\\data\\stocks'
transformed_path_stock = os.getcwd() + '\\transformed_data\\stocks'
transformed_path_etf = os.getcwd() + '\\transformed_data\\etfs'


# Date,Open,High,Low,Close,Adj Close,Volume
class StockTimeStamp:
    def __init__(self, date, open, high, low, close, adj_close, volume):
        self.date = date
        self.open = open
        self.high = high
        self.low = low
        self.close = close
        self.adj_close = adj_close
        self.volume = volume


# Iterate directory
try:
    stock_path = '.\\transformed_data\\stocks'
    etf_path = '.\\transformed_data\\etfs'
    stock_is_exist = os.path.exists(stock_path)
    etf_is_exist = os.path.exists(etf_path)
    if not stock_is_exist:
        os.mkdir(stock_path)
    if not etf_is_exist:
        os.mkdir(etf_path)

    # looping through all files in directory
    for file_path in os.listdir(dir_path):
        # check if current file_path is a file
        file_absolute_path = os.path.join(dir_path, file_path)
        if os.path.isfile(file_absolute_path):

            stockTimeStapms = []
            # open file
            with open(file_absolute_path, 'r') as file:
                csvReader = csv.DictReader(file)
                for row in csvReader:
                    lineInfo = StockTimeStamp(row['Date'], row['Open'], row['High'], row['Low'], row['Close'],
                                              row['Adj Close'], row['Volume'])
                    #append to list
                    stockTimeStapms.append(lineInfo)

            # write to files
            with open(transformed_path_stock + '\\' + file_path.replace('.csv', '.json'), 'w') as out_file:
                out_file.write("[")
                for timestamp in stockTimeStapms:
                    out_file.write(json.dumps(timestamp.__dict__, indent=4) + ', ')
                out_file.write("]")
# catching errors
except ValueError as error:
    print('Some Unexpected error happened: ${error}')
