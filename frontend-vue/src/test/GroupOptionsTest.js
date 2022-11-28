import { mount } from '@vue/test-utils'
import GroupOptions from '../components/GroupOptions.vue'

test('renders each button option', () => {
    // Pass the component as the first argument.
    const wrapper = mount(GroupOptions)

    const todo = wrapper.get('[data-test="todo"]')

    expect(todo.text()).toBe('Learn Vue.js 3')
})
