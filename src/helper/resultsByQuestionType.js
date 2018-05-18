const resultsByQuestionType = (answers) => {
  let resultsByTaskType = {
    imageSuccess: 0,
    imageTotal: 0,
    audioSuccess: 0,
    audioTotal: 0,
    selectionSuccess: 0,
    selectionTotal: 0,
    writtingSuccess: 0,
    writtingTotal: 0,
  };

  answers.forEach(item => {
    switch (item.questionType) {
      case 'image': resultsByTaskType.imageTotal += 1; if (item.isCorrect) resultsByTaskType.imageSuccess +=1; break;
      case 'audio': resultsByTaskType.audioTotal += 1; if (item.isCorrect) resultsByTaskType.audioSuccess +=1; break;
      case 'selection': resultsByTaskType.selectionTotal += 1; if (item.isCorrect) resultsByTaskType.selectionSuccess +=1; break;
      case 'typing': resultsByTaskType.writtingTotal += 1; if (item.isCorrect) resultsByTaskType.writtingSuccess +=1; break;
    }
  });

  return resultsByTaskType;
}

export default resultsByQuestionType;