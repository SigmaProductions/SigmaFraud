class Tweet:
    def __init__(self, text, id, state, created_at, author_id, author_name, media_url= None):
        self.text = text
        self.id = id
        self.state = state
        self.created_at = created_at
        self.author_id = author_id
        self.media_url = media_url
        self.author_name = author_name

    def to_dict(self):
        return {
            "text": self.text,
            "id":self.id,
            "state": self.state,
            "created_at": self.created_at,
            "author_id": self.author_id,
            "author_name": self.author_name,
            "media_url": self.media_url
            }
