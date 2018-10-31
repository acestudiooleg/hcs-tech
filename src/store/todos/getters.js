export default {
  filteredTodos({ list, filter }) {
    if (filter === 'all') {
      return list;
    }
    const filterList = (isActive) => (el) =>
      isActive ? !el.isCompleted : el.isCompleted;
    return list.filter(filterList(filter === 'active'));
  },
};
