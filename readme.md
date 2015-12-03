### install 
$> npm install

### start
$> gulp

### Explanation
In this branch, the 'webpack.config.js' is a bit different.

1. I just put 'react' and 'react-dom' to config.externals. 

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

2. I include the source files of 'react' and 'react-dom' in the index.html.

```
<script type="text/javascript" src="/js/common/react.min.js">
</script><script type="text/javascript" src="/js/common/react-dom.min.js">
</script><script type="text/javascript" src="/js/common/react-bootstrap.min.js">
</script><script type="text/javascript" src="/js/bundle.f25aaaa0.js">
```

And the following error occured.

  ```Uncaught TypeError: Cannot read property 'Component' of undefined```
