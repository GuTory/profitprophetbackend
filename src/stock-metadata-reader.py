import csv
import json

# Nasdaq Traded,
# Symbol,
# Security Name,
# Listing Exchange,
# Market Category,
# ETF,
# Round Lot Size,
# Test Issue,
# Financial Status,
# CQS Symbol,
# NASDAQ Symbol,
# NextShares

dictOfValues = {
    'nasdaq_traded': 'Nasdaq Traded',
    'symbol': 'Symbol',
    'security_name': 'Security Name',
    'listing_exchange': 'Listing Exchange',
    'market_category': 'Market Category',
    'etf': 'ETF',
    'round_lot_size': 'Round Lot Size',
    'test_issue': 'Test Issue',
    'financial_status': 'Financial Status',
    'cqs_symbol': 'CQS Symbol',
    'nasdaq_symbol': 'NASDAQ Symbol',
    'nextshares': 'NextShares'
}

class StockInfo:
    def __init__(self, nasdaq_traded, symbol, security_name, listing_exchange, market_category, etf, round_lot_size,
                 test_issue, financial_status, cqs_symbol, nasdaq_symbol, nextshares):
        self.nasdaq_traded = nasdaq_traded
        self.symbol = symbol
        self.security_name = security_name
        self.listing_exchange = listing_exchange
        self.market_category = market_category
        self.etf = etf
        self.round_lot_size = round_lot_size
        self.test_issue = test_issue
        self.financial_status = financial_status
        self.cqs_symbol = cqs_symbol
        self.nasdaq_symbol = nasdaq_symbol
        self.nextshares = nextshares
        self.csv = symbol + ".csv"

stocks = []
try:
    with open('.\\data\\symbols_valid_meta.csv', 'r') as file:
        csvReader = csv.DictReader(file)
        for row in csvReader:
            lineInfo = StockInfo(row["Nasdaq Traded"], row["Symbol"], row["Security Name"], row["Listing Exchange"],
                                 row["Market Category"], row["ETF"], row["Round Lot Size"], row["Test Issue"],
                                 row["Financial Status"], row["CQS Symbol"], row["NASDAQ Symbol"], row["NextShares"])
            stocks.append(lineInfo)
except FileNotFoundError:
    print("oops, file not found")

print("[", end='')
for stock in stocks:
    print(json.dumps(stock.__dict__) + ',')
print("]", end='')
