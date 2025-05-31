export const IMaskInput = jest.fn().mockImplementation(({ inputRef, ...props }) => {
  return <input ref={inputRef} {...props} />;
});

export default {
  IMaskInput,
}; 