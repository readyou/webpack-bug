### install 
$> npm install

### start
$> gulp

### Explanation
In this branch, the 'webpack.config.js' is a bit different.

```javascript
externals: [{
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  }, {
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  }],
```

I just put 'react' and 'react-dom' to config.externals. And the following error occured.

  Uncaught TypeError: Cannot read property 'Component' of undefined
