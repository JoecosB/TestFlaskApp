import os
import json

# 获取所有文件夹
all = os.listdir("/app/markdown_files")
dirs = []
for i in all:
    if i != "directory.json":
        dirs.append(i)

directory = {}
for i in dirs:
    with open(f"/app/markdown_files/{i}/{i}.md", "r") as f:
        title = f.readline().strip()[2:]
    stuff = os.listdir(f"/app/markdown_files/{i}")
    img = len(stuff) - 1
    id = i

    directory[title] = {"id": id, "img": img}

print(directory)
with open('/app/markdown_files/directory.json', 'w', encoding='utf-8') as file:
    json.dump(directory, file, ensure_ascii=False, indent=4)