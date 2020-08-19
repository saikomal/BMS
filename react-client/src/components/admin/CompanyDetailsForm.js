import React from "react";
import { reduxForm, Field } from "redux-form";

const parentRef = React.createRef();
const imageRef = React.createRef();

const handleChange = (event, input) => {
  event.preventDefault();
  console.log(event, input);
  let imageFile = event.target.files[0];
  if (imageFile) {
    const localImageUrl = URL.createObjectURL(imageFile);
    imageRef.current.src = localImageUrl;
    input.onChange(imageFile);
  }
};
const renderInput = ({ input, type, style, label }) => {
  if (input.name === "image") {
    delete input.value;
    return (
      <input
        {...input}
        type="file"
        ref={parentRef}
        style={style}
        onChange={(event) => handleChange(event, input)}
      />
    );
  } else {
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} type={type} />
      </div>
    );
  }
};

const postCompanyDetails = (data) => {
  console.log(data);
};

const CompanyDetailsForm = (props) => {
  return (
    <form className="ui form" onSubmit={props.handleSubmit(postCompanyDetails)}>
      <Field
        name="name"
        component={renderInput}
        type="text"
        label="Company Name"
      />
      <Field
        type="text"
        name="description"
        component={renderInput}
        label="Description"
      />
      <div className="field">
        <div className="ui small image">
          <img
            src="https://www.metatube.com/assets/metatube/video/img/Upload.svg"
            alt="Click to upload"
            onClick={() => parentRef.current.click()}
            ref={imageRef}
          />
        </div>
        <Field
          name="image"
          style={{ display: "none" }}
          component={renderInput}
        />
      </div>
      <button className="ui button primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default reduxForm({
  form: "companyDetails",
})(CompanyDetailsForm);
