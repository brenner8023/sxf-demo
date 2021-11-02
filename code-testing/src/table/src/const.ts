
export const columnInjectKey = Symbol('columns');

export const slotInjectKey = Symbol('table-slot');

export const sorterInjectKey = Symbol('sorter');

export const pagingInjectKey = Symbol('paging');

export const sortDirection = {
  asc: 'asc',
  desc:  'desc',
} as const;
