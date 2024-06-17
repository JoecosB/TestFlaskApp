from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route('/process', methods=['POST'])
def process():
    # 从请求体中获取数据
    data = request.json.get('data', '')
    # 返回处理后的消息
    return jsonify({'message': f'Received: {data}'})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
