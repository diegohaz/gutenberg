/**
 * WordPress dependencies
 */
import { render, press } from '@wordpress/test-utils';

/**
 * Internal dependencies
 */
import Toolbar from '../';
import ToolbarButton from '../../toolbar-button';

describe( 'Toolbar', () => {
	describe( 'basic rendering', () => {
		it( 'should render a toolbar with toolbar buttons', () => {
			const { getByLabelText } = render(
				<Toolbar __experimentalAccessibilityLabel="blocks">
					<ToolbarButton label="control1" />
					<ToolbarButton label="control2" />
				</Toolbar>
			);

			const control1 = getByLabelText( 'control1' );
			const control2 = getByLabelText( 'control2' );

			expect( control1 ).toBeInTheDocument();
			expect( control2 ).toBeInTheDocument();
		} );

		it( 'does not move focus between toolbar buttons with tab key', () => {
			const { getByLabelText, getByText } = render(
				<>
					<button>button1</button>
					<Toolbar __experimentalAccessibilityLabel="blocks">
						<ToolbarButton title="control1" />
						<ToolbarButton title="control2" />
					</Toolbar>
					<button>button2</button>
				</>
			);

			const button1 = getByText( 'button1' );
			const control1 = getByLabelText( 'control1' );
			const button2 = getByText( 'button2' );

			expect( button1 ).not.toHaveFocus();
			press.Tab();
			expect( button1 ).toHaveFocus();
			press.Tab();
			expect( control1 ).toHaveFocus();
			press.Tab();
			expect( button2 ).toHaveFocus();
		} );

		it( 'moves focus between toolbar buttons with arrow keys', () => {
			const { getByLabelText } = render(
				<Toolbar __experimentalAccessibilityLabel="blocks">
					<ToolbarButton title="control1" />
					<ToolbarButton title="control2" />
					<ToolbarButton title="control3" />
				</Toolbar>
			);

			const control1 = getByLabelText( 'control1' );
			const control2 = getByLabelText( 'control2' );
			const control3 = getByLabelText( 'control3' );

			expect( control1 ).not.toHaveFocus();
			press.Tab();
			expect( control1 ).toHaveFocus();
			press.Tab();
			expect( control1 ).toHaveFocus();
			press.ArrowRight();
			expect( control2 ).toHaveFocus();
			press.ArrowRight();
			expect( control3 ).toHaveFocus();
			press.ArrowRight();
			expect( control1 ).toHaveFocus();
			press.ArrowLeft();
			expect( control3 ).toHaveFocus();
		} );
	} );

	describe( 'ToolbarGroup', () => {
		it( 'should render an empty node, when controls are not passed', () => {
			const { container } = render( <Toolbar /> );
			expect( container ).toBeEmpty();
		} );

		it( 'should render an empty node, when controls are empty', () => {
			const { container } = render( <Toolbar controls={ [] } /> );
			expect( container ).toBeEmpty();
		} );

		it( 'should render a list of controls with buttons', () => {
			const clickHandler = ( event ) => event;
			const controls = [
				{
					icon: 'wordpress',
					title: 'WordPress',
					subscript: 'wp',
					onClick: clickHandler,
					isActive: false,
				},
			];
			const { getByLabelText } = render( <Toolbar controls={ controls } /> );
			const button = getByLabelText( 'WordPress' );

			expect( button ).toMatchSnapshot();
		} );
	} );
} );
