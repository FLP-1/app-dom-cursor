export const DatePicker = jest.fn().mockImplementation(({ value, onChange, ...props }) => {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    />
  );
});

export const LocalizationProvider = jest.fn().mockImplementation(({ children }) => {
  return <>{children}</>;
});

export const AdapterDateFns = jest.fn().mockImplementation(() => ({})); 