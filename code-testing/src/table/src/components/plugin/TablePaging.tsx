import { defineComponent, inject } from '@vue/composition-api';
import { pagingInjectKey } from '../../const';

export default defineComponent({
  name: 'TablePaging',
  setup () {
    const {
      pagingState: {
        currentPage,
        pageTotal,
        pageSize,
        pageLimit,
        setPageLimit,
        onLeftClick,
        onRightClick,
        onJumpPage,
      }
    } = inject(pagingInjectKey)!;

    const onSelectChange = (event: Event) => {
      setPageLimit(event.target?.value);
    };
    const onInputChange = (event: Event) => {
      onJumpPage(+event.target?.value);
    };

    return () => {
      return <div class="sxf-paging">
        <div>
          total：{ pageTotal.value }
        </div>
        <div
          class="sxf-paging__arrow sxf-paging__arrow--left"
          utid="paging-left"
          onClick={onLeftClick}></div>
        <input
          class="sxf-paging__input"
          type="text"
          value={currentPage.value}
          utid="paging-input"
          onChange={onInputChange} />
        页
        <div class="sxf-paging__arrow sxf-paging__arrow--right" onClick={onRightClick} utid="paging-right"></div>
        每页
        <select class="sxf-paging-select" name="" id="" value={pageLimit.value} onChange={onSelectChange} utid="paging-select">
          {
            pageSize.value.map((item: number) => <option>{ item }</option>)
          }
        </select>
        条
      </div>;
    };
  }
});
