from flask import Flask, send_file, abort, jsonify
import os, json, re

app = Flask(__name__)


def get_info():
    # 获取全部文章名和对应的文件夹名
    with open("/app/markdown_files/directory.json") as f:
        directory = json.load(f)

    # 获取全部文章名
    file_list = list(directory.keys())

    return file_list, directory


@app.route('/api/markdown_files/<filename>', methods=['GET'])
def get_markdown_file(filename):
    file_list, directory = get_info()

    # 生成完整文件路径
    id = directory[filename]["id"]
    file_path = os.path.join('/app/markdown_files', f"{id}/{id}.md")
    app.logger.info(f"Getting Markdown file: {file_path}")

    # 检查文件是否存在
    if not os.path.isfile(file_path):
        abort(404, description="File not found")

    try:
        return send_file(file_path, as_attachment=False, mimetype='text/plain')
    except Exception as e:
        return str(e), 500

@app.route('/api/get_file_list', methods=['GET'])
def get_file_list():
    file_list, directory = get_info()
    try:
        return jsonify(file_list=file_list)
    except Exception as e:
        return str(e), 500

@app.route('/api/get_img_info/<filename>', methods=['GET'])
def get_img_info(filename):
    file_list, directory = get_info()
    return jsonify(img_count=directory[filename]["img"])

@app.route('/api/get_img/<path:filename>', methods=['GET'])
def get_img(filename):
    file_list, directory = get_info()
    match = re.match(r"(.+?)/(.+)", filename)
    title = match.group(1)
    img_id = match.group(2)
    file_path = os.path.join(f"/app/markdown_files/{directory[title]['id']}/img{img_id}.png")

    app.logger.info(f"Getting Image: {file_path}")
    return send_file(file_path, as_attachment=False, mimetype='text/plain')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
