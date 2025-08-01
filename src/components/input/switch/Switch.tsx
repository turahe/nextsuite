import React, { useState } from "react";

const InputSwitch: React.FC = ({ label, id, checked }) => {
  const [inputCheck, setCheck] = useState<any>(checked ? true : false);

  return (
    <React.Fragment>
      <input
        type="checkbox"
        className="custom-control-input"
        defaultChecked={inputCheck}
        onClick={() => setCheck(!inputCheck)}
        id={id}
      />
      <label className="custom-control-label" htmlFor={id}>
        {label}
      </label>
    </React.Fragment>
  );
};

export default InputSwitch;
