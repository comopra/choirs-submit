const path = require('path');
const webpack = require('webpack');

module.exports = {

    entry: './main.js',
    output: {

        path: __dirname + "/../dist",
        filename: 'comopra-choirs-submit.js'

    },
    module: {

        loaders: [{

            test: /.jsx?$/,
            loader: 'babel-loader',
            query: {

                presets: ['es2015', 'react']


            }

        }]

    },
    resolve: {
        
        alias: {

            "react": __dirname + "/loaders/react",
            "react-dom": __dirname + "/loaders/react-dom"
            
        }
        
    }
    
};
