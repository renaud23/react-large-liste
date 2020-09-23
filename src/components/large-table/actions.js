export const ON_INIT = "react-large-table/on-init";
export const onInit = ({ rowHeight, data }) => ({
  type: ON_INIT,
  payload: { rowHeight, data },
});
