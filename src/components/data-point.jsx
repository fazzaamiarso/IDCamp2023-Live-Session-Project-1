const DataPoint = ({ property, value }) => {
  return (
    <p className="flex items-center gap-1">
      <span className="font-normal whitespace-nowrap">{property}:</span> <span>{value}</span>
    </p>
  );
};

export default DataPoint;
