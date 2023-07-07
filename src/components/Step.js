import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Input from './Input';
import Select from './Select';
import FileInput from './FileInput';

const Step = ({ data, onChange, onFileChange, onStepChange, errors, stepKey, step, onPrevStep }) => {
  let output = [];

  for (const [key, val] of Object.entries(data)) {
    if (val.type.split(':')[0] === 'input') {
      output.push(
        <div key={key}>
          <h2>{val.heading}</h2>
          <Input
            placeholder={val.placeholder}
            name={key}
            value={val.value}
            onChange={(e) => onChange(stepKey, e)}
            error={errors[key]}
            type={val.type.split(':')[1]}
          />
        </div>
      );
    } else if (val.type === 'select') {
      output.push(
        <div key={key}>
          <h2>{val.heading}</h2>
          <Select
            name={key}
            value={val.value}
            onChange={(e) => onChange(stepKey, e)}
            error={errors[key]}
            choices={val.choices}
          />
        </div>
      );
    } else if (val.type === 'file') {
      output.push(
        <div key={key}>
          <h2>{val.heading}</h2>
          <FileInput
            onChange={onFileChange}
            error={errors[key]}
            name={key}
            stepKey={stepKey}
            fileName={val.fileName}
          />
        </div>
      );
    }
  }

  return (
    <Fragment>
      {output}
      {step > 1 && (
        <button type="button" className="button is-warning mr-2" onClick={() => onPrevStep(step - 1)}>
          Previous
        </button>
      )}
      <button type="button" className="button is-link" onClick={(e) => onStepChange(data, e)}>
        Next
      </button>
    </Fragment>
  );
};

Step.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onFileChange: PropTypes.func,
  onStepChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  stepKey: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
  onPrevStep: PropTypes.func,
};

export default Step;
