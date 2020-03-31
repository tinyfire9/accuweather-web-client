import os
import json
import requests
 
BASE_URL = 'http://dataservice.accuweather.com'
API_KEY = os.environ['AW_API_KEY']

class Locations:
    def __init__(self):
        self.countries = []
        self.fetch_countries()
    def fetch_countries(self):
        res = requests.get(BASE_URL + '/locations/v1/regions', { 'apikey': API_KEY })
        regions = json.loads(res.text)
        for region in regions:
            self.countries = self.countries + self.fetch_countries_by_region(regions)
            
    def fetch_countries_by_region(self, region):
        res = requests.get(BASE_URL + '/locations/v1/countries/' + region['ID'], { 'apikey': API_KEY })
        countries = json.loads(res.text)
        for country in countries:
            country['Region'] = region
        return countries
    def get_countries(self):
        return self.countries