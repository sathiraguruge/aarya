const TextField = ({ id, name, type, value, onChange }) => {
  return (
    <input id={id} name={name} type={type} value={value} onChange={onChange} />
  );
};

export default TextField;
