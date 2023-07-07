import React, { Fragment } from 'react';

const Preview = ({ data, onPrevStep }) => {
  return (
    <div className="panel is-primary">
      <p className="panel-heading">Entered Data</p>
      <div className="panel-block is-block">
        <ul className="py-5">
          {data.map((input, index) => (
            <li key={index} className="py-2">
              <strong>{input.label}: </strong>
              {input.image ? (
                <img src={input.value} alt="Uploaded File" />
              ) : (
                <span>{input.value}</span>
              )}
            </li>
          ))}
        </ul>
        <div>
          <button type="button" className="button is-warning mr-2" onClick={onPrevStep}>
            Previous
          </button>
          <button type="submit" className="button is-primary">
            Submit form
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
