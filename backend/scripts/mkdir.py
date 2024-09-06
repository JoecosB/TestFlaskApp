import os
import json

# 获取所有文件夹
all = os.listdir("../markdown_files")
dirs = []
for i in all:
    if i != "directory.json":
        dirs.append(i)

directory = {}
for i in dirs:
    with open(f"../markdown_files/{i}/{i}.md", "r") as f:
        title = f.readline().strip()[2:]
    stuff = os.listdir(f"../markdown_files/{i}")
    img = len(stuff) - 1
    id = i

    directory[title] = {"id": id, "img": img}

directory = dict(sorted(directory.items(), key=lambda item: item[1]['id'])[::-1])

print(directory)

with open('../markdown_files/directory.json', 'w', encoding='utf-8') as file:
    json.dump(directory, file, ensure_ascii=False, indent=4)