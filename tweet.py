class Tweet:
    def __init__(self, text, id, state):
        self.text = text
        self.id = id
        self.state = state

    def to_dict(self):
        return {"text": self.text, "id":self.id, "state": self.state}
