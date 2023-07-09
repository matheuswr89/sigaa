import base64
import json
import warnings

import requests

warnings.filterwarnings("ignore")

ses = requests.Session()


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


def image(url):
    response = requests.get(url, verify=False)
    image = base64.b64encode(response.content)
    return f'data:{response.headers["Content-Type"]};base64,{image.decode("utf-8")}'
