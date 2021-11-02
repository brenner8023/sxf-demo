import { ref } from '@vue/composition-api'
import { mount } from '@vue/test-utils'
import { TestTable } from '../table'
import TableBody from '../table/src/components/TableBody'

describe('Table', () => {
  const TableMount = options => mount(TestTable, options)
  const tableData = [
    {
      id: 1,
      age: 11,
    }, {
      id: 2,
      age: 22,
    }, {
      id: 3,
      age: 33,
    }, {
      id: 4,
      age: 33,
    }, {
      id: 5,
      age: 33,
    }, {
      id: 6,
      age: 33,
    }, {
      id: 7,
      age: 33,
    },
  ]
  const columns = [
    {
      field: 'id',
      title: 'id',
    }, {
      field: 'age',
      sortFn: (a, b) => a.age - b.age,
    },
  ]

  test('render', () => {
    const wrapper = TableMount()
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => {
      wrapper.vm.$forceUpdate()
      wrapper.vm.$destroy()
    }).not.toThrow()
  })

  test('custom slot', () => {
    const wrapper = mount({
      template: `
        <TestTable :data="data" :columns="columns">
          <template #action>
            <div id="action-aaa">编辑</div>
          </template>
        </TestTable>
      `,
      components: {
        TestTable,
      },
      setup () {
        return {
          data: ref([{ age: 1 }, { age: 2 }]),
          columns: ref([{ field: 'age', title: '年龄' }, { field: 'action', title: '操作' }]),
        }
      },
    })
    expect(wrapper.find('#action-aaa').exists()).toBe(true)
  })

  test('paging', async () => {
    const pagingChange = jest.fn()
    const wrapper = TableMount({
      propsData: {
        plugin: {
          paging: {
            pageSize: [5, 6],
            total: 99,
          },
        },
        data: tableData,
        columns,
      },
      listeners: {
        'paging-change': pagingChange,
      },
    })

    await wrapper.find('.sxf-paging-select').setValue(6)
    expect(pagingChange).toHaveBeenCalledTimes(1)

    await wrapper.find('.sxf-paging__input').setValue(2)
    await wrapper.find('.sxf-paging__input').trigger('change')
    expect(pagingChange).toHaveBeenCalledTimes(2)
  })

  test('table sort', async () => {
    const wrapper = TableMount({
      propsData: {
        data: tableData,
        columns,
      },
    })

    await wrapper.find('.sxf-table-sorter__desc').trigger('click')
    expect(wrapper.find('.sxf-table-sorter__desc.sxf-table-sorter__desc--selected').exists()).toBe(true)

    await wrapper.find('.sxf-table-sorter__asc').trigger('click')
    expect(wrapper.find('.sxf-table-sorter__asc.sxf-table-sorter__asc--selected').exists()).toBe(true)
  })

  test('table body', () => {
    const wrapper = mount(TableBody, {
      propsData: {
        isTableEmpty: true,
      },
    })

    expect(wrapper.find('.sxf-empty').exists()).toBe(true)
  })
})
