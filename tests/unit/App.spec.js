import { fireEvent, within } from '@testing-library/vue';
import Component from '@/App.vue'

it('has a top bar', () => {
  const { getByRole } = doRender(Component);
  expect( getByRole('banner') ).toHaveTextContent('git-gud');
});

describe('left, pop-out menu', () => {
  it('exists', () => {
    const { getByRole } = doRender(Component);
    expect( getByRole('complementary') ).toBeInTheDocument();
  });

  it('defaults to closed', () => {
    const closed = 'v-navigation-drawer--close';
    const { getByRole } = doRender(Component);
    
    expect( getByRole('complementary') ).toHaveClass(closed);
  });

  it('opens and closes', async () => {
    const closed = 'v-navigation-drawer--close';
    const open = 'v-navigation-drawer--open';
    const { getByRole } = doRender(Component);

    expect( getByRole('complementary') ).toHaveClass(closed);
    
    const hamburger = within( getByRole('banner') ).getByRole('button');
    await fireEvent.click(hamburger);

    expect( getByRole('complementary') ).toHaveClass(open);

    await fireEvent.keyDown(hamburger, { key: 'Escape' });
    expect( getByRole('complementary') ).toHaveClass(closed);
  });
});

it('has a footer', () => {
  const { getByRole } = doRender(Component);
  expect( getByRole('contentinfo') ).toBeInTheDocument();
});

it('has a main content area', () => {
  const { getByRole } = doRender(Component);
  expect( getByRole('main') ).toBeInTheDocument();
});