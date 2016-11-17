const path = require( "path" );
var ExtractTextPlugin = require( "extract-text-webpack-plugin" );

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

            "react": path.resolve( "./loaders/react" ),
            "react-dom": path.resolve( "./loaders/react-dom" ),
            "redux": path.resolve( "./loaders/redux" ),
            "react-redux": path.resolve( "./loaders/react-redux" )

        }

    },
    plugins: [

        new ExtractTextPlugin( "comopra-choirs-submit.css", { allChunks: true } )

    ]

};
