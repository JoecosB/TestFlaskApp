import json
from datetime import datetime

# 定义文件路径
log_file = "../../public/update_info.json"


def load_logs(file_path):
    """加载现有的日志文件"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            logs = json.load(f)
    except FileNotFoundError:
        logs = []
    return logs


def save_logs(file_path, logs):
    """将日志保存到文件"""
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(logs, f, ensure_ascii=False, indent=2)


def add_log(date, changes):
    """添加新日志"""
    logs = load_logs(log_file)

    # 创建新日志条目
    new_log = {
        "date": date,
        "changes": changes
    }

    # 将新日志插入到列表的最前面
    logs.insert(0, new_log)

    # 保存更新后的日志
    save_logs(log_file, logs)
    print(f"日志已更新: {date}")


# 示例使用
if __name__ == "__main__":
    # 输入日期和更改内容
    input_date = input("请输入日期 (YYYY-MM-DD): ")
    input_changes = input("请输入更改内容 (使用逗号分隔多个更改): ").split(',')

    # 去除每个更改项的多余空格
    input_changes = [change.strip() for change in input_changes]

    # 添加日志
    add_log(input_date, input_changes)