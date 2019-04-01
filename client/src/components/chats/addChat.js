import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import FormField from "../utils/form_fields";
import { validate } from "../utils/misc";
import { ChatAdd } from "../../actions/chat_actions";
import { getCategories } from "../../actions/category_actions";
import LayoutAdmin from "../../hoc/adminLayout";
import FileUpload from "../utils/fileupload";

class AddChat extends Component {
  state = {
    formSuccess: false,
    formError: false,
    formErrMsg: "",
    brands: [],
    categories: [],
    formdata: {
      text: {
        element: "textarea",
        value: "",
        config: {
          name: "chat_input",
          type: "text",
          placeholder: "Enter your chat",
          rows: 5
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      },
      category: {
        element: "select",
        value: "",
        config: {
          name: "category_input",
          type: "select",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      },

      images: {
        value: [],
        validation: {
          required: false
        },
        valid: true,
        validationMessage: ""
      }
    }
  };
  componentDidMount() {
    const formdata = this.state.formdata;

    this.props.dispatch(getCategories()).then(response => {
      const newFormData = this.populateOptionFields(
        formdata,
        this.props.categories.byName,
        "category"
      );
      this.setState({
        formdata: newFormData
      });
    });
  }

  populateOptionFields(formdata, fileRows, type) {
    const fieldOptions = [];
    const newFormData = {
      ...formdata
    };
    fileRows.map(item => {
      fieldOptions.push({
        key: item._id,
        value: item.name
      });
    });
    for (let key in newFormData) {
      if (key === type) {
        newFormData[key].config.options = fieldOptions;
      }
    }
    return newFormData;
  }

  updateForm(element) {
    const newFormData = { ...this.state.formdata };
    const newElement = { ...newFormData[element.id] };
    newElement.value = element.event.target.value;

    let valiData = validate(newElement);
    newElement.valid = valiData[0];
    newElement.validationMessage = valiData[1];

    newFormData[element.id] = newElement;
    this.setState({
      formError: false,
      formSuccess: false,
      formdata: newFormData,
      formErrMsg: ""
    });
  }
  imagesHandler = images => {
    const newFormData = {
      ...this.state.formdata
    };
    newFormData["images"].value = images;
    newFormData["images"].valid = true;

    this.setState({
      formdata: newFormData
    });
  };
  submitForm(event) {
    event.preventDefault();
    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
      formIsValid = this.state.formdata[key].valid && formIsValid;
    }
    if (formIsValid) {
      this.props.dispatch(ChatAdd(dataToSubmit)).then(response => {
        if (response.payload.addSuccess) {
          this.props.history.push("/chats");
        } else {
          this.setState({
            formError: true,
            formErrMsg: "Error in addig new chat"
          });
        }
      });
    } else {
      this.setState({
        formError: true,
        formErrMsg: "Error. Invalid/Missing Reg entries"
      });
    }
  }
  render() {
    return (
      <LayoutAdmin>
        <div>
          <form onSubmit={event => this.submitForm(event)}>
            <FormField
              id={"text"}
              formdata={this.state.formdata.text}
              change={element => this.updateForm(element)}
            />
            <div className="form-fields">
              <div className="enroll_title">Category</div>
              <FormField
                id={"category"}
                formdata={this.state.formdata.category}
                change={element => this.updateForm(element)}
              />

              <FileUpload
                imagesHandler={images => this.imagesHandler(images)}
                reset={this.state.formSuccess}
              />
              {this.state.formSuccess ? (
                <div className="success_label">
                  Success - Record saved to database
                </div>
              ) : null}
              {this.state.formError ? (
                <div className="error_label">
                  Error - Could not save product
                </div>
              ) : null}

              <button
                onClick={event => this.submitForm(event)}
                className="button"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </LayoutAdmin>
    );
  }
}
const mapStateToProps = state => {
  return {
    brands: state.brands,
    categories: state.categories
  };
};
export default connect(mapStateToProps)(withRouter(AddChat));
