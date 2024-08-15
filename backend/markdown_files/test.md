### This is a test for markdown pages
# Python期末作业

## 项目简介

这是一个用于判断足球、篮球、排球的卷积神经网络，由B23050025钱坤编写。

## 文件结构

项目目录包含以下文件和文件夹：

- `machine_learning.py`: 模型训练脚本
- `run_model.py`: 模型调用脚本
- `README.md`: 说明文件
- `Pipfile`: PIPENV环境文件
- `Pipfile.lock`: PIPENV环境文件
- `basketball.jpeg`: 测试用图片
- `outcome/`: 输出模型文件夹
  - `model.h5`: 训练之后输出的模型
- `Data/`: 数据集文件夹
  - `train/`: 训练数据
  - `test/`: 测试数据

## 环境依赖

在运行该程序之前，请确保你的环境满足以下依赖：

- Python 3.x
- 其他依赖包列在 `Pipfile` 文件中

## 安装依赖

你可以通过以下命令安装所有依赖包, 并使环境生效：

```sh
pipenv install
pipenv shell
```
如果你还没安装pipenv, 可以使用如下命令：

```sh
pip install pipenv
```
当然，你也可以不愿意使用pipenv而使用conda。可以在Pipfile中找到这个项目完整的依赖。
另外，tensorflow包本体有约227MB大小，建议更换清华镜像源进行下载。

## 使用run_model.py
使用run_model.py之前，请确保终端处于同一目录中。可以参考如下格式: 
```sh
python3 run_model.py [图片路径]
```
在短暂的加载之后，会出现进度条，进度条加载完毕之后会出现判断结果。

