### install 
$> npm install

### start
$> gulp

### Changes from branch 'bug'
1. Extract 'Button' to a umd library named 'MyButton'.
3. Remove 'import' sentences from 'index.js' and use the global var MyButton.BtnInfo.
    
    ```javascript
    ReactDOM.render(<div><MyButton.BtnInfo /><ReactBootstrap.Button>Click Me!</ReactBootstrap.Button></div>, document.getElementById('main'));
    // import React from "react";
    // import ReactDOM from 'react-dom';
    // import {BtnInfo} from "./Button";
    
    // ReactDOM.render(<BtnInfo />, document.getElementById('main'));
    ```

4. Include the source files of 'react' and 'react-dom' in the index.html.

    ```
    <script type="text/javascript" src="/js/common/react.min.js"></script>
    <script type="text/javascript" src="/js/common/react-dom.min.js"></script>
    <script type="text/javascript" src="/js/common/react-bootstrap.min.js"></script>
    <script type="text/javascript" src="/js/common/button.js"></script>
    <script type="text/javascript" src="/js/bundle.466adffe.js"></script>
    ```

And everything is ok again.
