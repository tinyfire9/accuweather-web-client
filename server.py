import os
import bottle
import requests

url = 'http://dataservice.accuweather.com'
api_key = os.environ['AW_API_KEY']

@bottle.route('<path:path>')
def index(path):
    res = requests.get(url + path, { 'apikey': api_key })
    return res.text

bottle.run(host='localhost', port=8000)
