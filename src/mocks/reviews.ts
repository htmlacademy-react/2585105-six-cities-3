import { Comment } from '../types/review-type';

const AVATAR_URL = 'https://i.pravatar.cc/58';

export const reviews: Comment[] = [
  {
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: 'Sat Oct 21 2023 20:04:54 GMT+0300 (Москва, стандартное время)',
    id: 1,
    rating: 2,
    user: {
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      id: 1,
      isPro: false,
      name: 'Oliver.conner'
    }
  },
  {
    comment: 'A quiet  a a river by the unique lightness of Amsterdam.',
    date: 'Sat Oct 22 2023 20:04:54 GMT+0300 (Москва, стандартное время)',
    id: 2,
    rating: 5,
    user: {
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      id: 1,
      isPro: false,
      name: 'Luka.conner'
    }
  },
  {
    comment: 'A quiet cozy and picturesque by the unique lightness of Amsterdam.',
    date: 'Sat Oct 23 2023 20:04:54 GMT+0300 (Москва, стандартное время)',
    id: 3,
    rating: 3,
    user: {
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      id: 1,
      isPro: true,
      name: 'Oliver.conner'
    }
  },
  {
    comment: 'A quiet cozy  a river by the unique lightness of Amsterdam.',
    date: 'Sat Oct 27 2023 20:04:54 GMT+0300 (Москва, стандартное время)',
    id: 4,
    rating: 4,
    user: {
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      id: 1,
      isPro: true,
      name: 'Nick.conner'
    }
  },
  {
    comment: 'A quiet cozy and picturesque that hides behind ',
    date: 'Sat Oct 24 2023 20:04:54 GMT+0300 (Москва, стандартное время)',
    id: 5,
    rating: 1,
    user: {
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      id: 1,
      isPro: false,
      name: 'Valera.conner'
    }
  },
];
