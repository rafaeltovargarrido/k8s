from locust import FastHttpUser, task, between
import redis
import random

client_redis = redis.Redis(host='localhost', port=6379,decode_responses=True)
key = 'usuarios'
class MyUser(FastHttpUser):
    host = "http://react.local"  # Replace with your target host
    wait_time = between(1, 3) # Simulate user think time between 1 and 3 seconds

    def on_start(self):
        client_redis.lpush(key,str(random.randint(1,10))) # Add a user to the list
        pass # Initialize an HttpSession for the user if needed
        
    @task
    def hi(self):
        self.client.get("/hi")
