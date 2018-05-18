import mixArray from './mixArray.js';

const composeTest = (learningData, learningPatterns, languageId) => {
  let testData = [].concat(learningData);

  if (learningData.length > 0) {
    /* перемешивание вопросов */
    testData = mixArray(testData);
    /* присваивание типа вопроса */
    let breakPointsSum = 0;
    const learningPattern = learningPatterns[languageId] || learningPatterns[0];
    for (let item in learningPattern) {
      breakPointsSum += learningPattern[item];
    }
    
    const breakPoint1 = learningPattern.audio / breakPointsSum;
    const breakPoint2 = breakPoint1 + learningPattern.images / breakPointsSum;
    const breakPoint3 = breakPoint2 + learningPattern.selecting / breakPointsSum;
    
    testData = testData.map(item => {
      const questionType = Math.random();
      let type = '';
      let extra = [];      
      
      if (questionType <= breakPoint1) {
        type = 'audio';
      } else if (questionType <= breakPoint2) {
        type = 'image'
      } else if (questionType <= breakPoint3 && item.type === 'word') {
        extra = learningData.filter(content => (content.id !== item.id && content.type === 'word'));
        type = 'selectionW';
      } else if (questionType <= breakPoint3 && item.type === 'sentence') {
        type = 'selectionS';
      } else {
        type = 'typing';
      }
  
      return {...item, questionType: type, extra: extra};
    });
  }

  return testData;
}

export default composeTest;