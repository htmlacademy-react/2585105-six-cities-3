import { render, screen } from '@testing-library/react';
import Reviews from './reviews';
import { CommentType } from '../../types/review-type';

describe('Reviews Component', () => {
  const mockReviews: CommentType[] = [
    {
      id: 1,
      date: '2024-03-20T10:00:00.000Z',
      user: {
        name: 'John Doe',
        avatarUrl: 'avatar1.jpg',
        isPro: false,
        id: 1
      },
      comment: 'Great place!',
      rating: 5
    },
    {
      id: 2,
      date: '2024-03-19T10:00:00.000Z',
      user: {
        name: 'Jane Smith',
        avatarUrl: 'avatar2.jpg',
        isPro: true,
        id: 2
      },
      comment: 'Nice location',
      rating: 4
    }
  ];

  it('should render reviews correctly', () => {
    render(<Reviews reviewsProp={mockReviews} />);

    expect(screen.getByText('Reviews · 2')).toBeInTheDocument();
    expect(screen.getByText('Great place!')).toBeInTheDocument();
    expect(screen.getByText('Nice location')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();

    const avatars = screen.getAllByRole('img');
    expect(avatars).toHaveLength(2);
    expect(avatars[0]).toHaveAttribute('src', 'avatar1.jpg');
    expect(avatars[1]).toHaveAttribute('src', 'avatar2.jpg');
  });

  it('should not render anything when reviews are undefined', () => {
    const { container } = render(<Reviews reviewsProp={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  it('should limit reviews to 10', () => {
    const manyReviews = Array.from({ length: 15 }, (_, index) => ({
      id: index + 1,
      date: new Date().toISOString(),
      user: {
        name: `User ${index}`,
        avatarUrl: 'avatar.jpg',
        isPro: false,
        id: index + 1
      },
      comment: `Comment ${index}`,
      rating: 5
    }));

    render(<Reviews reviewsProp={manyReviews} />);
    const reviewElements = screen.getAllByRole('listitem');
    expect(reviewElements).toHaveLength(10);
  });
});
