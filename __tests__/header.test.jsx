import { render, screen } from '@testing-library/react';
import Header from '../src/app/components/header';

describe('Header', () => {
  it('renders the Header component without crashing', () => {
    render(<Header />);
    expect(screen.getByText('Hacker News Clone')).toBeInTheDocument();
  });

  it("create a snapshot", () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });
}
);