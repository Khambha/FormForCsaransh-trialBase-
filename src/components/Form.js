import React, { useState } from 'react';

import Step from './Step';
import Preview from './Preview';
import validate from '../helpers/validate';

const Form = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    stepOne: {
      temperature: {
        value: '',
        required: true,
        type: 'input',
        placeholder: 'in Kelvin',
        heading: 'Temperature'
      },
        potentialUsed: {
        value: '',
        required: true,
        type: 'input',
        placeholder: 'type of potential',
        heading:'Potential Used'
      },
      anuvikarLib: {
        value: '',
        required: true,
        type: 'input',
        placeholder: 'path to library',
        heading:'AnuVikar Library'
      },
      energy: {
        value: '',
        required: true,
        type: 'input',
        placeholder: 'in (Kev)',
        heading:'Energy'
      },
      latticeConstant: {
  
        value: '',
        minLength: 4,
        required: true,
        type: 'input',
        placeholder: 'Lattice Constant',
        heading:'Lattice Constant'
      },
      substrate: {
        value: '',
        required: true,
        type: 'select',
        choices: [
          { value: '', label: 'Choose element' },
          { value: 'Fe', label: 'Fe(Iron)' },
          { value: 'W', label: 'W(Tungstun)' }
        ],
        heading :'Substrate'
      },
    },
    stepTwo: {
      author: {
        value: '',
        required: false,
        type: 'input',
        placeholder: 'John Doe',
        heading:'Author'
      },
      isPKAGiven: {
        value: '',
        required: false,
        type: 'input',
        placeholder: 'nil',
        heading:'is PKA Used'
      }
    },
    stepThree: {
      uploadFile: {
        value: {},
        required: true,
        file: true,
        fileName: 'No file chosen',
        type: 'file',
        allowedTypes: ['json', 'db', 'dispxyz'],
        maxFileSize: 1024,
        heading:'Enter Json/DB File'
      }
    }
  });
  const [errors, setErrors] = useState({});

  const changeHandler = (step, e) => {
    e.persist();

    setFormData(prev => ({
      ...prev,
      [step]: {
        ...prev[step],
        [e.target.name]: {
          ...prev[step][e.target.name],
          value: e.target.value
        }
      }
    }));
  }

  const fileChangeHandler = (name, file, step) => {
    setFormData(prev => ({
      ...prev,
      [step]: {
        ...prev[step],
        [name]: {
          ...prev[step][name],
          value: file,
          fileName: file.name ? file.name : 'No file chosen'
        }
      }
    }));
  }

  const stepChangeHandler = (values, e) => {
    e.preventDefault();
    const newErrors = validate(values);
    setErrors(newErrors);
    if(Object.keys(newErrors).length === 0) {
      setStep(step + 1);
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('temperature', formData.stepOne.temperature.value);
    data.append('potentialUsed', formData.stepOne.potentialUsed.value);
    data.append('anuvikarLib', formData.stepOne.anuvikarLib.value);
    data.append('energy', formData.stepOne.energy.value);
    data.append('latticeConstant', formData.stepOne.latticeConstant.value);
    data.append('substrate', formData.stepOne.substrate.value);
    data.append('author', formData.stepTwo.author.value);
    data.append('isPKAgiven', formData.stepTwo.isPKAGiven.value);
    data.append('uploadFile', formData.stepThree.uploadFile.value);

    // In here you can send data to some api 
    // For example if you have some redux action: sendData(data)
  }

  return(
    <form onSubmit={submitHandler}>
      <h1 className="is-size-2 has-text-centered mb-4">Create an account</h1>
      {step === 1 && <Step 
        data={formData.stepOne}
        onChange={changeHandler}
        onStepChange={stepChangeHandler}
        errors={errors}
        stepKey="stepOne"
        step={1}
      />}
      {step === 2 && <Step 
        data={formData.stepTwo}
        onChange={changeHandler}
        onStepChange={stepChangeHandler}
        errors={errors}
        stepKey="stepTwo"
        onPrevStep={(step) => setStep(step)}
        step={2}
      />}
      {step === 3 && <Step 
        data={formData.stepThree}
        onChange={changeHandler}
        onStepChange={stepChangeHandler}
        onFileChange={fileChangeHandler}
        errors={errors}
        stepKey="stepThree"
        onPrevStep={(step) => setStep(step)}
        step={3}
      />}
      {step === 4 && <Preview 
        onPrevStep={() => setStep(step - 1)}
        data={[
          { label: 'temperature', value: formData.stepOne.temperature.value },
          { label: 'potentialUsed', value: formData.stepOne.potentialUsed.value },
          { label: 'anuvikarLib', value: formData.stepOne.anuvikarLib.value},
          { label: 'energy', value: formData.stepOne.energy.value},
          { label: 'latticeConstant', value: formData.stepOne.latticeConstant.value },
          { label: 'substrate', value: formData.stepOne.substrate.value },
          { label: 'author', value: formData.stepTwo.author.value },
          { label: 'isPKAGiven', value: formData.stepTwo.isPKAGiven.value},
          { label: 'uploadFile', value:formData.stepThree.uploadFile.value,image: true},
          
        ]}
      />}
    </form>
  );
}

export default Form;