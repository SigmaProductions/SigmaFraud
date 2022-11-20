class Tweet:
    def __init__(self, text, id, state, created_at, author_id, author_name, media_url= None, text_classification = None, contains_malicious_phrases = None, ocr_info = None, brands = None):
        self.text = text
        self.id = id
        self.state = state
        self.created_at = created_at
        self.author_id = author_id
        self.media_url = media_url
        self.author_name = author_name
        self.text_classification = text_classification
        self.contains_malicious_phrases = contains_malicious_phrases
        self.ocr_info = ocr_info
        self.brands = brands

    def to_dict(self):
        return {
            "text": self.text,
            "id":self.id,
            "state": self.state,
            "created_at": self.created_at,
            "author_id": self.author_id,
            "author_name": self.author_name,
            "text_classification": self.text_classification,
            "contains_malicious_phrases": self.contains_malicious_phrases,
            "ocr_info": self.ocr_info,
            "media_url": self.media_url,
            "brands": self.brands
            }
