import Form from "react-bootstrap/Form";

const TextField = ({
  id,
  name,
  type,
  value,
  label,
  onChange,
  placeholder,
  hint,
  isDisabled,
}) => {
  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        id={id}
        type={type}
        onChange={onChange}
        value={value}
        name={name}
        placeholder={placeholder}
        disabled={isDisabled === true ? true : false}
      />
      <Form.Text className="text-muted">{hint}</Form.Text>
    </Form.Group>
  );
};

export default TextField;
