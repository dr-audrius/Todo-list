import App from './App'

it('shallow matches snapshot', () => {
  const wrapper = shallow(
    <App />
  )
  expect(wrapper).toMatchSnapshot();
});


it('render matches snapshot', () => {
  const wrapper = render(
    <App />
  )
  expect(wrapper).toMatchSnapshot();
});