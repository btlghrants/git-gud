import Component from '@/components/Recommendation.vue'

it('does', () => {
  const { getByText } = doRender(Component);

  expect( getByText('Recommendations!') ).toBeInTheDocument();
});
