import { render } from '@testing-library/vue'
import Component from '@/components/Recommendation.vue'

describe('Recommendation.vue', () => {
  it('does', () => {
    const { getByText } = render(Component);
    
    expect( getByText('Recommendations!') ).toBeInTheDocument();
  });
})
