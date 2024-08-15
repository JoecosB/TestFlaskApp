from flask import Flask, send_file, abort
import os

app = Flask(__name__)


@app.route('/api/markdown_files/<filename>', methods=['GET'])
def get_markdown_file(filename):
    # 生成完整文件路径
    file_path = os.path.join('/app/markdown_files', filename)
    app.logger.info(f"Getting Markdown file: {file_path}")

    # 检查文件是否存在
    if not os.path.isfile(file_path):
        abort(404, description="File not found")

    try:
        return send_file(file_path, as_attachment=False, mimetype='text/plain')
    except Exception as e:
        return str(e), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
