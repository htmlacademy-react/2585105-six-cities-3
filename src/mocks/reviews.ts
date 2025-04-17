import { CommentType } from '../types/review-type';

const AVATAR_URL = 'https://i.pravatar.cc/58';

export const reviews: CommentType[] = [
  {
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: '2023-10-02T09:23:20.316Z',
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
    date: '2023-10-02T09:23:20.316Z',
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
    date: '2023-10-02T09:23:20.316Z',
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
    date: '2023-10-02T09:23:20.316Z',
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
    date: '2023-10-02T09:23:20.316Z',
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
