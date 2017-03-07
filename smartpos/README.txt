Environment Reuqirements:
node v7.1.0
npm@4.0.2
grunt-cli v1.2.0

Online Demo: http://us.ypseek.com/labs/2016/smartpos/

Setup:
1 use npm download packages
npm update

2 use grunt to launch local development environment: http://localhost:8080/
grunt

3 use grunt-webpack to build (packs all js files into 2 single files, one is buisiness model, another is libraries)
grunt build

4 product files (meaning that those can be deploied on the product server) are:
index.html
script/
res/


Main codes are in:
app/

Start point is: app/main.js

(This is a singlepage web app)
Mainly used technologies:
babel ES2015
Webpack
ReactJS
Bootstrap
Sass/Scss





