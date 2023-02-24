import { render, screen,fireEvent } from '@testing-library/react';
import ProfileStatus from './ProfileStatus';
describe('Profile status Component', () => {
    test('status should render correctly and show text', () => {
        render(
            <ProfileStatus status={'hello'} />
        );
        const text = screen.getByText('hello')
        const input = screen.queryByRole('textbox')
        expect(text).toBeInTheDocument('hello');
        expect(input).toBeNull()
    });
    test('input should displayed instead span', () => {
        render(
            <ProfileStatus status={'hello'} />
        );
        const text = screen.getByText('hello')
        fireEvent.doubleClick(text);
        const input = screen.queryByRole('textbox')
        expect(text).not.toBeInTheDocument()
        expect(input).toBeInTheDocument()
    });
    test('input should be changed', () => {
        const mockUpdateStatusThunk = jest.fn();
        render(<ProfileStatus status="Hello, world!" updateStatusThunk={mockUpdateStatusThunk} />);
        const statusText = screen.getByText('Hello, world!');
        fireEvent.doubleClick(statusText);
        const inputField = screen.getByRole('textbox');
        fireEvent.change(inputField, { target: { value: 'New status' } });
        fireEvent.blur(inputField);
        expect(mockUpdateStatusThunk).toHaveBeenCalledWith('New status');
    });
})
