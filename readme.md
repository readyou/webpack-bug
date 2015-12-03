### install 
$> npm install

### start
$> gulp

### Explanation
1. Put 'react' and 'react-dom' to config.externals. 

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

2. Extract 'Button' to a umd library named 'MyButton'.
3. Remove 'import' sentences from 'index.js' and use the global var BtnInfo.

```javascript
ReactDOM.render(<div><MyButton.BtnInfo /><ReactBootstrap.Button>Click Me!</ReactBootstrap.Button></div>, document.getElementById('main'));
// import React from "react";
// import ReactDOM from 'react-dom';
// import {BtnInfo} from "./Button";

// ReactDOM.render(<BtnInfo />, document.getElementById('main'));
```

3. Include the source files of 'react' and 'react-dom' in the index.html.

```
<script type="text/javascript" src="/js/common/react.min.js"></script>
<script type="text/javascript" src="/js/common/react-dom.min.js"></script>
<script type="text/javascript" src="/js/common/react-bootstrap.min.js"></script>
<script type="text/javascript" src="/js/bundle.f25aaaa0.js">
```

And the following error occured.

  ```Uncaught TypeError: Cannot read property 'Component' of undefined```
