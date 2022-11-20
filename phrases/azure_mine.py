import os
import string
key = ''
endpoint = "https://sigmafraudd.cognitiveservices.azure.com/"

from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential

def _remove_punctuation( text):
        punctuationfree="".join([i for i in text if i not in string.punctuation])
        return punctuationfree

def authenticate_client():
    ta_credential = AzureKeyCredential(key)
    text_analytics_client = TextAnalyticsClient(
            endpoint=endpoint, 
            credential=ta_credential)
    return text_analytics_client


def key_phrase_extraction(client, str_input):
    try:
        to_return = []
        str_input = str_input.astype("string").str.lower().dropna().tolist()
        str = [_remove_punctuation(i) for i in str_input]
        response_all = client.extract_key_phrases(documents =str)
        for response in response_all:
            if not response.is_error:
                for phrase in response.key_phrases:
                    if len(phrase) > 2:
                        if to_return is None:
                            to_return = [phrase]
                        else:
                            to_return.append(phrase)
                        print(to_return)
            else:
                print(response.id, response.error)
        return to_return

    except Exception as err:
        print("Encountered exception. {}".format(err))
        