from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes
from azure.cognitiveservices.vision.computervision.models import VisualFeatureTypes
from msrest.authentication import CognitiveServicesCredentials
import time
import numpy as np

from tweet import Tweet

class Ocr():
    def __init__(self) -> None:
        self.key = '196c8cea10f848f7adc62fe68f94efb1'
        self.endpoint="https://sigmafraudvision.cognitiveservices.azure.com/"
        self.computervision_client = ComputerVisionClient(self.endpoint, CognitiveServicesCredentials(self.key))

    def brand(self, image_url):
        image_features = ["brands"]
        cv_results=self.computervision_client.analyze_image(image_url, image_features)
        result=[]
        for brand in cv_results.brands:
            result.append(brand.name)
        return result


    def _ocr(self, image_url):
        read_response = self.computervision_client.read(image_url, language='pl',  raw=True)
        read_operation_location = read_response.headers["Operation-Location"]
        # Grab the ID from the URL
        operation_id = read_operation_location.split("/")[-1]

        while True:
            read_result = self.computervision_client.get_read_result(operation_id)
            if read_result.status not in ['notStarted', 'running']:
                break
            time.sleep(1)
        if read_result.status == OperationStatusCodes.succeeded:
            return read_result.analyze_result.read_results


    def check_tweet_image(self, tweet: Tweet):
        if tweet.media_url is not None:
            res= self._ocr(tweet.media_url)
            for text_result in res:
                for line in text_result.lines:
                    if line.bounding_box is not None:
                        print(line.bounding_box)
                        tweet.ocr_info['bounding_box'] = np.array2string(line.bounding_box)
                        tweet.ocr_info['text'] = line.text


url="https://learn.microsoft.com/en-gb/azure/cognitive-services/computer-vision/images/red-shirt-logo.jpg"
print(Ocr.brand(url))
