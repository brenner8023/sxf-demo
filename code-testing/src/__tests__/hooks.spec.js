
import { ref } from '@vue/composition-api'
import { useDataSource, useSorter, usePaging, useLRPaging } from '../table/src/hooks'

describe('hooks', () => {
  const mockTimer = (times = 0) => new Promise(resolve => setTimeout(resolve, times))

  test('useDataSource', () => {
    const data = [
      {
        age: 10,
      }, {
        age: 8,
      }, {
        age: 12,
      }, {
        age: 9,
      },
    ]
    const sortFn = (a, b) => a.age - b.age
    const { sortTableData, tableData } = useDataSource({
      data,
      columns: [
        { field: 'id' },
        { field: 'age', sortFn },
      ],
    })

    expect(tableData.value.length).toBe(4)
    const numArr = [8, 9, 10, 12]

    sortTableData('asc', 10)
    expect(tableData.value[0].age).toBe(10)


    sortTableData('asc', 1)

    numArr.forEach((num, idx) => {
      expect(tableData.value[idx].age).toBe(num)
    })

    sortTableData('desc', 1)
    numArr.reverse().forEach((num, idx) => {
      expect(tableData.value[idx].age).toBe(num)
    })
  })

  test('useSorter', async () => {
    const sortFn = jest.fn()
    const {
      selectedColIndex,
      setSorterState,
      isAsc,
    } = useSorter(sortFn)

    expect(isAsc.value).toBe(true)
    expect(selectedColIndex.value).toBe(-1)

    setSorterState('desc', 2)
    expect(isAsc.value).toBe(false)
    expect(selectedColIndex.value).toBe(2)

    await mockTimer()
    expect(sortFn).toBeCalledTimes(1)

    setSorterState('desc', 2)
    await mockTimer()
    expect(sortFn).toBeCalledTimes(1)
  })

  test('useLRPaging', () => {
    const changeFn = jest.fn()
    const start = ref(1)
    const limit = ref(20)
    const {
      onLeftClick,
      onRightClick,
    } = useLRPaging(start, limit, ref(100), changeFn)

    onLeftClick()
    expect(start.value).toBe(1)
    expect(changeFn).toHaveBeenCalledTimes(0)

    onRightClick()
    expect(start.value).toBe(21)
    expect(changeFn).toHaveBeenCalledTimes(1)

    start.value = 81
    onRightClick()
    expect(start.value).toBe(81)
    expect(changeFn).toHaveBeenCalledTimes(1)

    onLeftClick()
    expect(start.value).toBe(61)
    expect(changeFn).toHaveBeenCalledTimes(2)
  })

  test('usePaging不开启分页', () => {
    const {
      pageSize,
      currentPage,
      pageLimit,
      setPageLimit,
      pageTotal,
      onJumpPage,
    } = usePaging(ref(false))

    expect(pageTotal.value).toBe(0)
  })

  test('usePaging', () => {
    const {
      pageSize,
      currentPage,
      pageLimit,
      setPageLimit,
      pageTotal,
      onJumpPage,
    } = usePaging(ref({ total: 100, pageSize: [30, 40] }))

    expect(pageTotal.value).toBe(100)
    expect(pageLimit.value).toBe(30)
    expect(currentPage.value).toBe(1)
    expect(pageSize.value).toEqual([30, 40])

    setPageLimit(40)
    expect(pageLimit.value).toBe(40)

    onJumpPage(2)
    expect(currentPage.value).toBe(2)
  })
})
