var webpack = require('webpack');
var path = require('path');
var package = require('../package.json');
let UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var config = {
    entry: './src/index',
    output: {
        path: path.resolve(__dirname,'../dist'),
        filename: 'analytics.amd.js',
        libraryTarget:'amd'
    },
    module: {
        loaders: [
            { test: path.resolve(__dirname,'../src'),
              loader: 'babel-loader'
            }
        ]
    },
    plugins: [

    ]
};





function createDist(type,name,minify){
  var _config = JSON.parse(JSON.stringify(config));
  _config.output.filename = 'analytics.'+type+ (minify?'.min':'')+'.js';
  if(name){
    _config.output.library = name;
  }
  _config.output.libraryTarget = type;
  _config.plugins = _config.plugins.concat(
  new webpack.DefinePlugin({
      '__VERSION__': JSON.stringify(package.version)
  }));
  if(minify){
    _config.plugins.push(new UglifyJSPlugin({
      compressor: {
        warnings: false,
        drop_console:true,
        unused:true
      },
    }));
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
