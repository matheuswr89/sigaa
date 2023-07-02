import json
import warnings

import requests

warnings.filterwarnings("ignore")

ses = requests.Session()


def hello_world():
    return "Hello, World!"


def post(url, data):
    response = ses.post(url=url, data=json.loads(data), verify=False)
    return response.text


def get(url):
    response = ses.get(url=url, verify=False)
    return response.text


def download(url, data):
    response = ses.post(url=url, data=json.loads(data), verify=False, stream=True)
    retArray = [int(i) for i in response.content]
    return {"content": retArray, "headers": dict(response.headers.items())}
