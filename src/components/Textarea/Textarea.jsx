import React from "react";

const Textarea = ({ ...rest }) => {
  return <textarea {...rest} spellCheck="false" autoComplete="off"></textarea>;
};

export default Textarea;
