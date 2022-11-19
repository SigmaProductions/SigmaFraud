from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes
from azure.cognitiveservices.vision.computervision.models import VisualFeatureTypes
from msrest.authentication import CognitiveServicesCredentials
import time
import os

key = os.environ["VISION_API_SECRET"]
endpoint="https://sigmafraudvision.cognitiveservices.azure.com/"

test_url="https://raw.githubusercontent.com/MicrosoftDocs/azure-docs/master/articles/cognitive-services/Computer-vision/Images/readsample.jpg"

computervision_client = ComputerVisionClient(endpoint, CognitiveServicesCredentials(key))


def ocr(image_url):
    read_response = computervision_client.read(image_url, language='pl',  raw=True)
    read_operation_location = read_response.headers["Operation-Location"]
    # Grab the ID from the URL
    operation_id = read_operation_location.split("/")[-1]

    while True:
        read_result = computervision_client.get_read_result(operation_id)
        if read_result.status not in ['notStarted', 'running']:
            break
        time.sleep(1)
    if read_result.status == OperationStatusCodes.succeeded:
        return read_result.analyze_result.read_results

res= ocr(test_url)
for text_result in res:
    for line in text_result.lines:
        print(line)


