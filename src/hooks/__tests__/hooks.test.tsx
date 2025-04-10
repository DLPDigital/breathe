import React from "react"
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../../app/page';

  // Mock the custom hooks
 jest.mock('@/hooks/useBreathingTimer', () => ({
   useBreathingTimer: jest.fn()
 }));

 jest.mock('@/hooks/useTextTransition', () => ({
   useTextTransition: jest.fn()
 }));

 describe('Home Page', () => {
   test('renders intro modal initially', () => {
     render(<Home />);
    
     expect(screen.getByText(/how many breaths/i)).toBeInTheDocument();
   });
  
   test('starts session when form is submitted', () => {
     render(<Home />);
    
     const input = screen.getByRole('spinbutton');
     fireEvent.change(input, { target: { value: '5' } });
    
     fireEvent.click(screen.getByRole('button', { name: /start/i }));
    
      // Verify the modal disappears and session begins
     expect(screen.queryByText(/how many breaths/i)).not.toBeInTheDocument();
     expect(screen.getByText(/5 breaths remaining/i)).toBeInTheDocument();
   });
});