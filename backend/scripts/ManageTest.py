import os
import shutil
import argparse

# 你可以在这里设置默认的目录路径和文件夹数量
BASE_DIR = "/app/markdown_files/"  # 修改为你想要的默认路径
COUNT = 40  # 修改为你想要的默认文件夹数量


def create_folders_with_md(base_dir, count):
    # 确保指定的目录存在，如果不存在则创建
    if not os.path.exists(base_dir):
        os.makedirs(base_dir)

    for i in range(2, count + 1):
        # 生成每个文件夹的路径
        folder_path = os.path.join(base_dir, str(i))

        # 创建文件夹
        os.makedirs(folder_path, exist_ok=True)

        # 在文件夹内创建一个对应的md文件
        md_file_path = os.path.join(folder_path, f"{i}.md")
        with open(md_file_path, 'w') as md_file:
            md_file.write(f"# ThisIsTest{i}\n")  # 在md文件中写入标题 ThisIsTest[i]


def delete_folders_with_md(base_dir, count):
    for i in range(2, count + 1):
        # 生成每个文件夹的路径
        folder_path = os.path.join(base_dir, str(i))

        # 如果文件夹存在，则删除它及其内容
        if os.path.exists(folder_path):
            shutil.rmtree(folder_path)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Create or delete folders with md files.")
    parser.add_argument('action', choices=['create', 'delete'], help="Action to perform: create or delete folders.")

    args = parser.parse_args()

    if args.action == 'create':
        create_folders_with_md(BASE_DIR, COUNT)
    elif args.action == 'delete':
        delete_folders_with_md(BASE_DIR, COUNT)