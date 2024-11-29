import re
import logging
import json

from flask import Flask, send_file
from randimage import get_random_image
import matplotlib.pyplot as plt
import os
app = Flask(__name__)
# Configure structlog to format log entries as JSON

# Regex pattern to parse Werkzeug log lines and to strip ANSI color codes
log_pattern = re.compile(
    r'(?P<ip>[\d\.]+) - - \[(?P<datetime>[^\]]+)\] "(?P<method>\w+) (?P<url>[^ ]+) (?P<protocol>[^"]+)" (?P<status>\d+)'
)
ansi_escape = re.compile(r'\x1B[@-_][0-?]*[ -/]*[@-~]')  # Matches ANSI color codes

class JsonFormatter(logging.Formatter):
    def format(self, record):
        # Strip ANSI escape codes
        log_message = ansi_escape.sub('', record.getMessage())
        log_match = log_pattern.search(log_message)

        if log_match:
            log_record = {
                "level": record.levelname,
                "time": self.formatTime(record, self.datefmt),
                "ip": log_match.group("ip"),
                "datetime": log_match.group("datetime"),
                "method": log_match.group("method"),
                "url": log_match.group("url"),
                "protocol": log_match.group("protocol"),
                "status": log_match.group("status")
            }
        else:
            # Fallback if the message doesn't match the expected format
            log_record = {
                "level": record.levelname,
                "time": self.formatTime(record, self.datefmt),
                "message": log_message
            }
        return json.dumps(log_record)

# Configure Flask's logger
handler = logging.StreamHandler()
handler.setFormatter(JsonFormatter())
app.logger.addHandler(handler)
app.logger.setLevel(logging.INFO)

# Configure Werkzeug logger
werkzeug_logger = logging.getLogger("werkzeug")
werkzeug_logger.setLevel(logging.INFO)
werkzeug_handler = logging.StreamHandler()
werkzeug_handler.setFormatter(JsonFormatter())
werkzeug_logger.addHandler(werkzeug_handler)


@app.route("/crear")
def crear():

    img_size = (128, 128)
    img = get_random_image(img_size)

    # Save the image temporarily
    output_dir = "/images"
    os.makedirs(output_dir, exist_ok=True)
    output_file = os.path.join(output_dir, "randimage.png")
    plt.imsave(output_file, img)

    # Serve the image file as a response
    return send_file(output_file, mimetype='image/png')


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9090, debug=True)