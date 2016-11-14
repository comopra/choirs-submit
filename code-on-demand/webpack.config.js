const path = require( "path" );
const webpack = require( "webpack" );
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

    entry: "./main.js",
    output: {

        path: __dirname + "/../dist",
        publicPath: "/dist/",
        filename: "comopra-choirs-submit.js"

    },
    module: {

        loaders: [ {

            test: /.jsx?$/,
            loader: "babel-loader",
            query: {

                presets: [ "es2015", "react" ]


            }

        }, {

            test: /\.less$/,
            loader: ExtractTextPlugin.extract( "css!less" )
        } ]

    },
    resolve: {

        alias: {

            "react": __dirname + "/loaders/react",
            "react-dom": __dirname + "/loaders/react-dom"

        }

    },
    plugins: [
        
        new ExtractTextPlugin( "comopra-choirs-submit.css", { allChunks: true } ) 
    
    ]

};
