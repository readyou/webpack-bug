import React from "react";

// const BtnInfo = React.createClass({

//   render() {
//     return (
//       <div>
//         <button type="button" className="btn btn-info">Info button</button>
//       </div>
//     );
//   }
// });

// export default BtnInfo;

class BtnInfo extends React.Component {
  render() {
    return (
      <button type="button" className="btn btn-info">Info button</button>
    );
  }
};

export default BtnInfo;
