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
        value={value}
        name={name}
        placeholder={placeholder}
        disabled={isDisabled === true ? true : false}
      />
      {true && (
        <Form.Control.Feedback type="invalid">Invalid</Form.Control.Feedback>
      )}
      <Form.Text className="text-muted">{hint}</Form.Text>
    </Form.Group>
  );
};

export default TextField;
