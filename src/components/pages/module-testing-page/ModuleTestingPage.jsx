import React from 'react';
import TestingModule from 'components/common/testing-module';

class ModuleTestingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  render() {
    return (
      <TestingModule {...this.props} moduleId={this.props.match.params.moduleId} />
    );
  }
}
  
export default ModuleTestingPage;