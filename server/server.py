import os
import bottle
import requests
from locations import Locations

BASE_URL = 'http://dataservice.accuweather.com'
API_KEY = os.environ['AW_API_KEY']

locations = Locations()
@bottle.route('/locations/countries')
def countries():
    return locations.countries

@bottle.route('<path:path>')
def index(path):
    res = requests.get(BASE_URL + path, { 'apikey': API_KEY })
    return res.text


bottle.run(host='localhost', port=8000)
