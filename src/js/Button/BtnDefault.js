import React from "react";

class BtnDefault extends React.Component {

  constructor(props) {
    super(props);
		this.state = {};
  }

  render() {
    return (
      <button type="button" className="btn btn-default">Default button</button>
    );
  }
}

export default BtnDefault;
