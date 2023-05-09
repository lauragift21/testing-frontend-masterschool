import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../src/app/header';

describe('Header', () => {
  it('renders without crashing', () => {
    render(<Header />);
    expect(screen.getByText('Hacker News Clone')).toBeInTheDocument();
  });

  it('creates a snapshot', () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });
}
);