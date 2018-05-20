import React from 'react';
import TestingModule from 'components/common/testing-module';

class RevisionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleId: 0,
    }
  }
  
  /* TODO если получили ответ и контента нету просто вывести мол нечего повторять*/
  componentDidMount() {
    console.log(this.props.match.params.languageId);
    this.props.getRevisionModule(this.props.userId, this.props.match.params.languageId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.learningData.length > 0) {
      this.setState({moduleId: nextProps.learningData[0].module_id });
    }
  }

  render() {
    console.log(this.state.moduleId);
    if (this.state.moduleId) {
      return (
        <TestingModule {...this.props} moduleId={this.state.moduleId} />
      );
    } else {
      return null;
    }
  }
}
  
export default RevisionPage;