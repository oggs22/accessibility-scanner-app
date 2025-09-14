import { render, screen, fireEvent } from '@testing-library/react';
import { ScanForm } from './ScanForm';

describe('ScanForm', () => {
  it('calls onSubmit with the URLs separated by line', async () => {
    const mockSubmit = jest.fn();
    render(<ScanForm onSubmit={mockSubmit} />);

    const textarea = screen.getByPlaceholderText(
      /https:\/\/example\.com/i
    );

    fireEvent.change(textarea, {
      target: {
        value: 'https://example.com\nhttps://another-site.com'
      }
    });

    fireEvent.submit(screen.getByRole('form'));

    expect(await screen.findByRole('button', { name: /start scan/i }))
      .toBeInTheDocument();

    expect(mockSubmit).toHaveBeenCalledWith([
      'https://example.com',
      'https://another-site.com',
    ]);
  });

  it('shows an error if a URL is invalid', async () => {
    const mockSubmit = jest.fn();
    render(<ScanForm onSubmit={mockSubmit} />);

    const textarea = screen.getByPlaceholderText(/https:\/\/example\.com/i);

    fireEvent.change(textarea, { target: { value: 'notaurl' } });
    fireEvent.submit(screen.getByRole('form'));

    expect(
      await screen.findByText(/All URLs must be valid/i)
    ).toBeInTheDocument();

    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
