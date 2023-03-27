import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Conversions from './Conversions';
import '@testing-library/jest-dom';

describe('App Component Test', () => {
	it('renders without crashing', () => {
		const { container } = render(<Conversions />);
		expect(container).toBeInTheDocument();
	});
});
