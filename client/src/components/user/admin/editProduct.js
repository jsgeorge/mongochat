import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import FormField from "../../utils/form_fields";
import { validate } from "../../utils/misc";
import { ProductAdd } from "../../../actions/product_actions";
import { getBrands } from "../../../actions/brand_actions";
import { getCategories } from "../../../actions/category_actions";
import LayoutAdmin from "../../../Hoc/adminLayout";

import FileUpload from "../../utils/fileupload";
import { getProductById } from "../../../actions/product_actions";

class EditProduct extends Component {
  state = {
    formSuccess: false,
    formError: false,
    formErrMsg: "",
    brands: [],
    categories: [],
    fieldNames: [],
    formdata: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "name_input",
          type: "text",
          placeholder: "Enter name"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      },
      description: {
        element: "textarea",
        value: "",
        config: {
          name: "descripton_input",
          type: "text",
          placeholder: "Enter desc",
          rows: 5
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      },
      price: {
        element: "input",
        value: "",
        config: {
          name: "price_input",
          type: "text",
          placeholder: "Enter price"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      },
      brand: {
        element: "select",
        value: "",
        config: {
          name: "brand_input",
          type: "select",
          options: []
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
      shipping: {
        element: "select",
        value: "",
        config: {
          name: "shipping_input",
          type: "select",
          options: [{ key: true, value: "yes" }, { key: false, value: "no" }]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      },
      available: {
        element: "select",
        value: "",
        config: {
          name: "available_input",
          type: "select",
          options: [{ key: true, value: "yes" }, { key: false, value: "no" }]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      },
      frets: {
        element: "input",
        value: "",
        config: {
          name: "frets_input",
          type: "text",
          placeholder: "Enter frets"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      },
      sold: {
        element: "input",
        value: "",
        config: {
          name: "sold_input",
          type: "text",
          placeholder: "Enter sold"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      },
      publish: {
        element: "select",
        value: "",
        config: {
          name: "publish_input",
          type: "select",
          options: [{ key: true, value: "yes" }, { key: false, value: "no" }]
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
          required: true
        },
        valid: true,
        validationMessage: ""
      }
    }
  };
  componentDidMount() {
    const prodId = this.props.match.params.id;

    const formdata = this.state.formdata;

    this.props.dispatch(getBrands()).then(response => {
      const newFormData = this.populateOptionFields(
        formdata,
        this.props.brands.byName,
        "brand"
      );
      this.setState({
        formdata: newFormData
      });
    });

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

    this.props.dispatch(getProductById(prodId, "single")).then(response => {
      const newFormData = this.populateFields(
        formdata,
        this.props.products.byId
      );
      this.setState({
        formdata: newFormData
      });
    });
  }
  populateFields(formData, fileRows) {
    const fields = [];
    fileRows.map(item => {
      formData["name"].value = item.name;
      formData["name"].valid = true;
      formData["name"].validationMessage = "";
      formData["description"].value = item.description;
      formData["description"].valid = true;
      formData["description"].validationMessage = "";
      formData["price"].value = item.price;
      formData["price"].valid = true;
      formData["price"].validationMessage = "";
      formData["category"].value = item.category;
      formData["category"].valid = true;
      formData["category"].validationMessage = "";
      //   fields.push({
      //     name: item.name,
      //     description: item.description,
      //     price: item.price,
      //     category: item.category,
      //     brand: item.brand,
      //     shippiung: item.shipping,
      //     available: item.available,
      //     frets: item.frets,
      //     sold: item.sold,
      //     publish: item.publish
      //   });
    });

    // for (let key in formData) {
    //   formData[key].value = fields[key];
    //   formData[key].valid = true;
    //   formData[key].validationMessage = "";
    // }

    return formData;
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
      this.props.dispatch(ProductAdd(dataToSubmit)).then(response => {
        if (response.payload.addSuccess) {
          this.setState({
            formSuccess: true,
            formError: false
          });
        } else {
          this.setState({
            formError: true,
            formErrMsg: "Error in addig new product"
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
          <h2>Edit Product</h2>
          <form onSubmit={event => this.submitForm(event)}>
            <div className="enroll_title">Name</div>
            <div className="enroll_input">
              <FormField
                id={"name"}
                formdata={this.state.formdata.name}
                change={element => this.updateForm(element)}
              />
              <div className="enroll_title">Description</div>

              <FormField
                id={"description"}
                formdata={this.state.formdata.description}
                change={element => this.updateForm(element)}
              />
              <div className="enroll_title">Price</div>
              <FormField
                id={"price"}
                formdata={this.state.formdata.price}
                change={element => this.updateForm(element)}
              />
              <div className="enroll_title">Category</div>
              <FormField
                id={"category"}
                formdata={this.state.formdata.category}
                change={element => this.updateForm(element)}
              />
              <div className="enroll_title">Brand</div>
              <FormField
                id={"brand"}
                formdata={this.state.formdata.brand}
                change={element => this.updateForm(element)}
              />

              <div className="enroll_title">Shipping</div>
              <FormField
                id={"shipping"}
                formdata={this.state.formdata.shipping}
                change={element => this.updateForm(element)}
                style={"width:100px"}
              />
              <div className="enroll_title">available</div>
              <FormField
                id={"available"}
                formdata={this.state.formdata.available}
                change={element => this.updateForm(element)}
              />
              <div className="enroll_title">frets</div>
              <FormField
                id={"frets"}
                formdata={this.state.formdata.frets}
                change={element => this.updateForm(element)}
              />
              <div className="enroll_title">sold</div>
              <FormField
                id={"sold"}
                formdata={this.state.formdata.sold}
                change={element => this.updateForm(element)}
              />
              <div className="enroll_title">Publish</div>
              <FormField
                id={"publish"}
                formdata={this.state.formdata.publish}
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
    products: state.products,
    brands: state.brands,
    categories: state.categories
  };
};
export default connect(mapStateToProps)(withRouter(EditProduct));
