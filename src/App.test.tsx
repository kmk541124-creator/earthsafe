import { render, screen } from '@testing-library/react';
import App from './App';

test('renders game buttons', () => {
  render(<App />);
  expect(screen.getByText('기술 발전')).toBeInTheDocument();
  expect(screen.getByText('생활 방식 바꾸기')).toBeInTheDocument();
});
