from flask import Flask, request

app = Flask(__name__)

# 定义两个字典存储用户信息和用户特定消息
usr_pwd = {
    'joecos': 'joecos10496',
    'lutalli': 'ReallyNotGay',
    'sheldon': '卧槽真学不动了'
}

usr_info = {
    'joecos': 'Go brush your teeth',
    'lutalli': 'Dont masturbate',
    'sheldon': '每月资金有两千，能吃一天是一天'
}

@app.route('/test', methods=['GET', 'POST'])
def test():
    if request.method == 'POST':
        usr_name = request.form.get('name')  # 从表单数据中获取用户名
        pwd = request.form.get('pwd')  # 从表单数据中获取密码

        # 首先检查用户名是否存在
        if usr_name in usr_pwd:
            # 用户名存在，进一步检查密码是否正确
            if usr_pwd[usr_name] == pwd:
                message = usr_info[usr_name]  # 获取对应的用户消息
                return f'{usr_name}, {message}!'
            else:
                return '密码错误，请重新输入！'
        else:
            return '用户名不存在，请检查用户名是否正确！'

    # 如果是GET请求或其他情况，显示一个简单的登录表单
    return '<form method="post">Name: <input type="text" name="name"><input type="text" name="pwd"><input type="submit" value="Submit"></form>'

if __name__ == '__main__':
    app.run(ssl_context=('./Certificate/cert.pem', './Certificate/key.pem'), host='0.0.0.0', port=8080, debug=True)
