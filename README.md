# Business-City

> A Vue.js project.

``` bash
#导入数据库

#开启后端服务
node bin/www

#安装依赖
npm install

#运行项目
npm run dev

# 打包项目
npm run build

```

# 这是一个前后端共用一个package.json的项目

## [主流开源协议之间异同](https://www.zhihu.com/question/19568896)

## 用命令行把修改过后的代码上传到github

1. git add .
2. git commit -m "提交信息"
3. git push

# 1.坑：使用vuex时遇到

使用vuex有时会报如下的错误

```
here are multiple modules with names that only differ in casing.
This can lead to unexpected behavior when compiling on a filesystem with other case-semantic.
Use equal casing. Compare these module identifiers
```

这是因为你引入vuex的时候有的地方首字母大写,有的地方首字母小写导致的,如下:

NavHeader.vue这样引入

```
import {mapState} from "Vuex"
```

在main.js又这样引入,注意划线部分大写了

```
import Vuex from 'Vuex';
```

总结:引入的时候,要么全首字母大写,要么全小写,否则会报以上错误

# 2.坑：npm run dev 提示如下:

```
 No PostCSS Config found in...
```

这是因为缺少了一个配置文件，.postcssrc.js，配置内容如下

```
module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    "autoprefixer": {}
  }
}
```

在main.js又这样引入,注意划线部分大写了

```
import Vuex from 'Vuex';
```

注意：这个文件是放在项目的根目录下的,这样配置好以后，再重新启动项目，就没有这方面的问题了。

git时，修改.gitignore文件，添加一行!.postcssrc.js，如下

```
.DS_Store
node_modules/
/dist/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
!.postcssrc.js
# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
```

# Mongodb数据导出工具mongoexport和导入工具mongoimport

Mongodb中的mongoexport工具可以把一个collection导出成JSON格式或CSV格式的文件。可以通过参数指定导出的数据项，也可以根据指定的条件导出数据。

两个工具位于mongodb安装目录的bin目录下

可通过 **\*mongoexport --help** *命令查看具体使用方法



- -h:指明数据库宿主机的IP

- -u:指明数据库的用户名

- -p:指明数据库的密码

- -d:指明数据库的名字

- -c:指明collection的名字

- -f:指明要导出那些列

- -o:指明到要导出的文件名

- -q:指明导出数据的过滤条件

  ​

# 导出工具mongoexport

```
mongoexport -h localhost:27017 -d local -c students --csv -f classid,name,age -o f:/beifen/students_csv.dat 
```

### 参数详解：

- -h:数据库地址
- -d:指明使用的库，本例中为goods
- -c:指明要导出的集合，本例中为students
- -o:指明要导出的文件名，本例中为students_csv.dat
- -csv：指明要导出为csv格式,，不写默认json
- -f：指明需要导出classid、name、age这3列的数据
- -o:表示导出到的位置

本项目在C:\Program Files\MongoDB\Server\3.2\bin目录下运行

```
mongoexport -h localhost:27017 -d local -c users -o e:2/users.json
mongoexport -h localhost:27017 -d local -c goods -o e:2/goods.json
```

# 导入工具mongoimport

```
mongoimport -d local -c students --type csv --headerline --file f:/beifen/students_csv.dat   
```

参数详解

- -d:指明数据库名，本例中为goods
- -c:指明collection名，本例中为students
- -type:指明要导入的文件格式，不写默认json
- -headerline:指明第一行是列名，不需要导入
- -file：指明要导入的文件