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
  error,
}) => {
  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        onChange={onChange}
        d
        value={value}
        name={name}
        placeholder={placeholder}
        disabled={isDisabled}
      />
      {error && <div className="alert alert-danger">{error}</div>}
      <Form.Text className="text-muted">{hint}</Form.Text>
    </Form.Group>
  );
};

export default TextField;
