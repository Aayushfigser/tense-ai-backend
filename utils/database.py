from pymongo import MongoClient

class Database:
    def __init__(self):
        self.client = MongoClient('mongodb://localhost:27017/')
        self.db = self.client['tense_ai']
        self.collection = self.db['user_data']

    def save_user_data(self, user_id, data):
        self.collection.update_one({'user_id': user_id}, {'$set': data}, upsert=True)

    def get_user_data(self, user_id):
        return self.collection.find_one({'user_id': user_id})
