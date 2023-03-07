const Filter = ({ filter, onFilterChanged }) => {
  return (
    <div>
      filter shown with: <input value={filter} onChange={onFilterChanged} />
    </div>
  );
};

export default Filter;
