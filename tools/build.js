var webpack = require('webpack');
var path = require('path');
var config = {
    entry: './src/main',
    output: {
        path: path.resolve(__dirname,'../dist'),
        filename: 'analytics.amd.js',
        libraryTarget:'amd'
    },
    module: {
        loaders: [
            { test: path.resolve(__dirname,'../src'),
              loader: 'babel-loader',
              query: {
                stage: 0
              }
            }
        ]
    },
    plugins: []
};
var plugins = [
      new webpack.optimize.UglifyJsPlugin()
    ];




function createDist(type,name,minify){
  var _config = JSON.parse(JSON.stringify(config));
  _config.output.filename = 'analytics.'+type+ (minify?'.min':'')+'.js';
  if(name){
    _config.output.library = name;
  }
  _config.output.libraryTarget = type;
  if(minify){
    _config.plugins = plugins;
  }
  webpack(_config,function(err,result){
    if(err){
      console.error(err);
    }else{
      console.log(type+(minify?'.min':'')+' done');
    }
  });
}

createDist('umd','LeanAnalytics',false);
createDist('umd','LeanAnalytics',true);
createDist('var','LeanAnalytics',false);
createDist('var','LeanAnalytics',true);
createDist('amd',false,false);
createDist('amd',false,true);
