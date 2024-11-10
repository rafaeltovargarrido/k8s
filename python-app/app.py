from flask import Flask
import redis

app = Flask(__name__)

@app.route("/")
def hello_world():
    r = redis.Redis(host='redis-master.test.svc.cluster.local', port=6379, db=0)
    r.set('foo', 'bar')
    return "Hello, World!"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)