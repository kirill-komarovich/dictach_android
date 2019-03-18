import 'react-native';
import React from 'react';
import OutlinedInput, { AnimatedText } from '../../src/components/outlinedInput';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('OutlinedInput', () => {
  const labelText = 'Test';

  it('renders correctly', () => {
    const component = renderer.create(<OutlinedInput label={labelText} />);
    const label = component.root.findByType(AnimatedText);

    expect(label.props.children).toBe(`${labelText}`);
  });
});
