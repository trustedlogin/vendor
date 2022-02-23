import { useMemo } from "react";

export const DangerButton = ({
  onClick,
  id,
  children,
  isExpanded,
  hasPopup,
}) => {
  return (
    <Button
      onClick={onClick}
      className="bg-white border border-red-700 rounded-lg px-4 py-2 inline-flex items-center justify-center text-sm font-medium text-red-700 hover:bg-gray-50 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-red-700"
      id={id}
      isExpanded={isExpanded}
      hasPopup={hasPopup}>
      {children}
    </Button>
  );
};

DangerButton.defaultProps = {
  isExpanded: false,
  hasPopup: true,
};
export const ToggleSwitch = ({
  isEnabled,
  onClick,
  labeledBy,
  describedBy,
}) => {
  const buttonClasses = useMemo(() => {
    let classes =
      "ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500";
    if (isEnabled) {
      classes = `bg-teal-500 ${classes}`;
    } else {
      classes = `bg-gray-200 ${classes}`;
    }
    return classes;
  }, [isEnabled]);

  const spanClasses = useMemo(() => {
    let classes =
      "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200";
    if (isEnabled) {
      classes = `translate-x-5 ${classes}`;
    } else {
      classes = `translate-x-0 ${classes}`;
    }
    return classes;
  }, [isEnabled]);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      type="button"
      className={buttonClasses}
      role="switch"
      aria-checked={isEnabled}
      aria-labelledby={labeledBy}
      aria-describedby={describedBy}>
      <span aria-hidden="true" className={spanClasses}></span>
    </button>
  );
};

/*** OLDER COMPONENTS BELOW */
export const Notice = ({ heading, link, description, type }) => {
  return (
    <div className={`notice notice-${type ?? "sucess"}`}>
      <h2>{heading}</h2>
      <h3 className="description">
        <a href={link} rel="noopener" target="_blank">
          {description}
        </a>
      </h3>
    </div>
  );
};

export const Form = ({
  children,
  onSubmit,
  title,
  className,
  method,
  action,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      title={title}
      className={className}
      method={method}
      action={action}>
      {title ? <h2 className="title">{title}</h2> : null}
      {children}
    </form>
  );
};

export const FormTable = ({ children, title, RenderTitle }) => {
  return (
    <>
      {RenderTitle ? (
        <RenderTitle title={title} />
      ) : title ? (
        <h2 className="title">{title}</h2>
      ) : null}
      <table className="form-table" role="presentation">
        <tbody>{children}</tbody>
      </table>
    </>
  );
};

export const Select = ({
  name,
  label,
  value,
  options,
  help,
  onChange,
  disabled,
}) => {
  const attrs = useMemo(() => {
    let a = {
      name,
      label,
      value,
      className: disabled ? "postform disabled" : "postform",
    };

    if (help) {
      a["aria-describedby"] = `${name}-description`;
    }
  }, [name, label, value, help]);
  return (
    <FieldTr name={name} label={label} help={help}>
      <select {...attrs} onChange={(e) => onChange(e.target.value)}>
        {options.map(({ value, label }) => (
          <option className="level-0" value={value} key={value}>
            {label}
          </option>
        ))}
      </select>
    </FieldTr>
  );
};

export const FieldTr = ({ children, name, label, help }) => {
  return (
    <tr>
      <th scope="row">
        <label htmlFor={name}>{label}</label>
        {help ? (
          <span id={`${name}-description`} className="description">
            {help}
          </span>
        ) : null}
      </th>
      <td>{children}</td>
    </tr>
  );
};

export const Input = ({ name, label, value, type, onChange, disabled }) => {
  return (
    <FieldTr name={name} label={label}>
      <input
        name={name}
        type={type ? type : "text"}
        id={name}
        value={value}
        className={`regular-text ltr ${disabled ? "disabled" : ""}`}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </FieldTr>
  );
};

export const Submit = ({ name, variant, value, disabled, onClick }) => (
  <p className="submit">
    <input
      type="submit"
      name={name}
      id={name}
      className={`button button-${variant ? variant : "secondary"} button-hero`}
      value={value}
      disabled={disabled}
      onClick={onClick}
    />
  </p>
);

export const BigButton = ({ children, variant, onClick, className }) => (
  <p className={`big-button ${className}`}>
    <button
      className={`button button-${variant ? variant : "secondary"} button-hero`}
      onClick={onClick}>
      {children}
    </button>
  </p>
);
