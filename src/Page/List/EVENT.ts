// 列表变化事件，参数均为被删除的事项 id

export const ITEM_DELETE = Symbol('ITEM_DELETE'); // 事项被删除
export const ITEM_DONE = Symbol('ITEM_DONE');   // 事项完成
export const ITEM_UNDONE = Symbol('ITEM_UNDONE');   // 事项未完成