// Import the `mount()` method from Vue Test Utils
import { mount } from '@vue/test-utils'
import GroupOptions from '../components/StudentAttendance.vue'

test('contains correct data', () => {
  // mount() returns a wrapped Vue component we can interact with
  const wrapper = mount(GroupOptions, {
    propsData: {
        lessons: [{_id: '6381ed3e66ccc1329ee204b8', date: '2022-11-02T00:00:00.000Z', attendance: Array(10), v: 0},
        {_id: '6381ee0266ccc1329ee204e2', date: '2023-09-26T00:00:00.000Z', attendance: Array(10), v: 0},
        {_id: '6381ee983b82e182d30c78a3', date: '2022-11-12T00:00:00.000Z', attendance: Array(10), v: 0},
        {_id: '6381f03dc810308506ed14a3', date: '2022-11-08T00:00:00.000Z', attendance: Array(10), v: 0},
        {_id: '6381f592d513ee0237ddbf3a', date: '2022-11-03T00:00:00.000Z', attendance: Array(10), __v: 0}],

        attendances: [{_id: '6381ed3e66ccc1329ee204ba', attendanceValue: -1, student: '6381238d48c8263e8218b01a', v: 0} ,
        {_id: '6381ee0266ccc1329ee204e4', attendanceValue: -1, student: '6381238d48c8263e8218b01a', v: 0},
        {_id: '6381ee983b82e182d30c78a5', attendanceValue: -1, student: '6381238d48c8263e8218b01a', v: 0},
        {_id: '6381f03dc810308506ed14a5', attendanceValue: 0, student: '6381238d48c8263e8218b01a', v: 0},
        {_id: '6381f592d513ee0237ddbf3c', attendanceValue: 0, student: '6381238d48c8263e8218b01a', __v: 0}],
    }
  })

  // Assert the rendered text of the component
  expect(wrapper.text()).toContain('Hello world');

  // Example:
  // const listItem = wrapper.get('[data-test="todo"]');
  // <div data-test="todo">...</div>
  // expect(todo.text()).toBe('Learn Vue.js 3')

  const listItem2 = wrapper.get('[class="col-md-6"]');
  // class="col-md-6"
  expect(lessons.attendances()).toBe([{_id: '6381ed3e66ccc1329ee204b8', date: '2022-11-02T00:00:00.000Z', attendance: Array(10), v: 0},
  {_id: '6381ee0266ccc1329ee204e2', date: '2023-09-26T00:00:00.000Z', attendance: Array(10), v: 0},
  {_id: '6381ee983b82e182d30c78a3', date: '2022-11-12T00:00:00.000Z', attendance: Array(10), v: 0},
  {_id: '6381f03dc810308506ed14a3', date: '2022-11-08T00:00:00.000Z', attendance: Array(10), v: 0},
  {_id: '6381f592d513ee0237ddbf3a', date: '2022-11-03T00:00:00.000Z', attendance: Array(10), __v: 0}]);

  expect(attendances.attendances()).toBe({_id: '6381ed3e66ccc1329ee204ba', attendanceValue: -1, student: '6381238d48c8263e8218b01a', v: 0} ,
        {_id: '6381ee0266ccc1329ee204e4', attendanceValue: -1, student: '6381238d48c8263e8218b01a', v: 0},
        {_id: '6381ee983b82e182d30c78a5', attendanceValue: -1, student: '6381238d48c8263e8218b01a', v: 0},
        {_id: '6381f03dc810308506ed14a5', attendanceValue: 0, student: '6381238d48c8263e8218b01a', v: 0},
        {_id: '6381f592d513ee0237ddbf3c', attendanceValue: 0, student: '6381238d48c8263e8218b01a', __v: 0})

  

})

// Attendance
/**
 * 
 * (5) [{…}, {…}, {…}, {…}, {…}]
0
: 
{_id: '6381ed3e66ccc1329ee204ba', attendanceValue: -1, student: '6381238d48c8263e8218b01a', v: 0}
1
: 
{_id: '6381ee0266ccc1329ee204e4', attendanceValue: -1, student: '6381238d48c8263e8218b01a', v: 0}
2
: 
{_id: '6381ee983b82e182d30c78a5', attendanceValue: -1, student: '6381238d48c8263e8218b01a', v: 0}
3
: 
{_id: '6381f03dc810308506ed14a5', attendanceValue: 0, student: '6381238d48c8263e8218b01a', v: 0}
4
: 
{_id: '6381f592d513ee0237ddbf3c', attendanceValue: 0, student: '6381238d48c8263e8218b01a', __v: 0}
length
: 
5
[[Prototype]]
: 
Array(0)
 */




// Lessons: 

/**
 * (5) [{…}, {…}, {…}, {…}, {…}]
0
: 
{_id: '6381ed3e66ccc1329ee204b8', date: '2022-11-02T00:00:00.000Z', attendance: Array(10), v: 0}
1
: 
{_id: '6381ee0266ccc1329ee204e2', date: '2023-09-26T00:00:00.000Z', attendance: Array(10), v: 0}
2
: 
{_id: '6381ee983b82e182d30c78a3', date: '2022-11-12T00:00:00.000Z', attendance: Array(10), v: 0}
3
: 
{_id: '6381f03dc810308506ed14a3', date: '2022-11-08T00:00:00.000Z', attendance: Array(10), v: 0}
4
: 
{_id: '6381f592d513ee0237ddbf3a', date: '2022-11-03T00:00:00.000Z', attendance: Array(10), __v: 0}
length
: 
5
[[Prototype]]
: 
Array(0)
 */