// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Profile from './Profile';

vi.mock('axios');

describe('Profile component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows "Not logged in." when backend returns 401', async () => {
    axios.get.mockRejectedValueOnce({ response: { status: 401 } });
    render(<Profile />);
    await waitFor(() =>
      expect(screen.getByText('Not logged in.')).toBeInTheDocument()
    );
  });

  it('shows user email when backend returns user data', async () => {
    axios.get.mockResolvedValueOnce({
      data: { name: 'Ada', email: 'ada@test.com', given_name: 'Ada' },
    });
    render(<Profile />);
    await waitFor(() =>
      expect(screen.getByText('ada@test.com')).toBeInTheDocument()
    );
  });
});
