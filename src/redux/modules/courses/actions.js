import {courseConstants} from './actionConstants.js';

const allLanguages = [
  {
    id: 1,
    title: 'English',
    image: 'https://qph.fs.quoracdn.net/main-qimg-861c4789bbbeb90f5a8eb253cf0a412a-c',
    onLearning: true,
  },
  {
    id: 2,
    title: 'French',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/255px-Flag_of_France.svg.png',
    onLearning: true,
  },
  {
    id: 3,
    title: 'Japanese',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/1280px-Flag_of_Japan.svg.png',
    onLearning: false,
  },
];

/// TODO продумать как получать теги
/// TODO константы для уровней
const fakemodule = [
  {
    id: 1,
    title: 'Приветствие',
    learned: true,
    tag: 'basic',
    level: 0,
  },
  {
    id: 2,
    title: 'Фрукты',
    learned: true,
    tag: 'basic',
    level: 0,
  },
  {
    id: 3,
    title: 'Овощи',
    learned: true,
    tag: 'basic',
    level: 0,
  },
  {
    id: 4,
    title: 'Семья',
    learned: true,
    tag: 'basic',
    level: 0,
  },
  {
    id: 5,
    title: 'Семья 2',
    learned: true,
    tag: 'basic',
    level: 0,
  },
  {
    id: 6,
    title: 'Путешествия',
    learned: false,
    tag: 'travel',
    level: 2,
  },
]

export const getAllCoursesList = () => ({
  type: courseConstants.GET_ALL,
  list: allLanguages,
});

export const getCurrentCourse = () => ({
  type: courseConstants.GET_CURRENT,
  course: fakemodule,
});

export const getCurrentModule = () => ({
  type: courseConstants.GET_INFO,
  module: [],
});
