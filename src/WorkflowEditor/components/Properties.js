import React, { Component } from 'react';
import { componentType } from '../WorkflowEditor';

export class HTMLProperties extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formContent: {
                title: "",
                isRequired: false,
                type: "",
                name: '',
                description: '',
                placeholder: '',
                id: '',
                errorMessage: '',
                options: [],
                validations: [],
            },
        }
    };

    setProperties = (properties) => {
        const { title, isRequired, type, name, description, placeholder, id, errorMessage, options, validations } = properties;
        const { formContent } = this.state;
        formContent.title = title;
        formContent.isRequired = isRequired;
        formContent.type = type;
        formContent.name = name;
        formContent.description = description;
        formContent.placeholder = placeholder;
        formContent.id = id;
        formContent.errorMessage = errorMessage;
        formContent.options = options;
        formContent.validations = validations;
        this.setState({
            formContent
        });
    };

    handleChangeFormContent = (e) => {
        const { value, name } = e.target;
        const { formContent } = this.state;
        formContent[name] = value;
        this.setState({
            formContent
        });
        this.props.onChangeContent(formContent);
    };

    handleOptionChange = (e, index) => {
        const { value, name } = e.target;
        const { formContent } = this.state;
        formContent.options[index][name] = value;
        this.setState({
            formContent
        });
        this.props.onChangeContent(formContent);
    };

    onClickRemoveFormData = (index, e) => {
        e.preventDefault();
        const { formContent } = this.state;
        formContent.options.splice(index, 1);
        this.setState({
            formContent
        });
        this.props.onChangeContent(formContent);
    }

    renderOptions = () => {
        const { formContent } = this.state;
        let retData = [];
        for (let i = 0; i < formContent.options.length; i++) {
            let row = formContent.options[i];
            retData.push(
                <div key={`options-${i}`} className="d-block mb-3">
                    <div className="d-inline-block w-75 align-top">
                        <div className="d-inline-block w-50 pr-1">
                            <input type="text" className="form-control" name="value" value={row.value} onChange={(e) => this.handleOptionChange(e, i)} />
                        </div>
                        <div className="d-inline-block w-50 pl-1">
                            <input type="text" className="form-control" name="label" value={row.label} onChange={(e) => this.handleOptionChange(e, i)} />
                        </div>
                    </div>
                    <div className="d-inline-block w-25 align-top">
                        <button className="btn text-primary"><i className="fa fa-times" onClick={e => this.onClickRemoveFormData(i, e)}></i></button>
                    </div>
                </div>
            );
        }
        return retData;
    }

    addNewOption = () => {
        const { formContent } = this.state;
        formContent.options.push({ label: `Item ${formContent.options.length + 1}`, value: formContent.options.length + 1 });
        this.setState({
            formContent
        });
        this.props.onChangeContent(formContent);
    }

    addNewValidationData = () => {
        const { formContent } = this.state;
        formContent.validations.push({ regEx: '', message: '' });
        this.setState({
            formContent
        });
        this.props.onChangeContent(formContent);
    }

    renderValidations = () => {
        const { formContent } = this.state;
        let retData = [];
        for (let i = 0; i < formContent.validations.length; i++) {
            let row = formContent.validations[i];
            retData.push(
                <div key={`validations-${i}`} className="d-block mb-3">
                    <div className="d-inline-block w-75 align-top">
                        <div className="d-inline-block w-50 pr-1">
                            <input type="text" className="form-control" name="regularexpression" value={row.regEx} onChange={(e) => this.handleChangeValidationContent(e, i)} />
                        </div>
                        <div className="d-inline-block w-50 pl-1">
                            <input type="text" className="form-control" name="errormessage" value={row.message} onChange={(e) => this.handleChangeValidationContent(e, i)} />
                        </div>
                    </div>
                    <div className="d-inline-block w-25 align-top">
                        <button className="btn text-primary"><i className="fa fa-times" onClick={e => this.onClickRemoveValidationData(i, e)}></i></button>
                    </div>
                </div>
            );
        }
        return retData;
    }

    handleChangeValidationContent = (e, index) => {
        const { value, name } = e.target;
        const { formContent } = this.state;
        for (let i = 0; i < formContent.validations.length; i++) {
            if (i === index && name === 'regularexpression') {
                formContent.validations[i].regEx = value;
            } else if (i === index && name === 'errormessage') {
                formContent.validations[i].message = value;
            }
        }
        this.setState({
            formContent
        });
        this.props.onChangeContent(formContent);
    }

    onClickRemoveValidationData = (index, e) => {
        e.preventDefault();
        const { formContent } = this.state;
        formContent.validations.splice(index, 1);
        this.setState({
            formContent
        });
        this.props.onChangeContent(formContent);
    }

    setRequiredProperty = (e) => {
        const { formContent } = this.state;
        formContent.isRequired = e.target.checked;
        this.setState({
            formContent,
        });
        this.props.onChangeContent(formContent);
    }

    render() {
        const { formContent } = this.state;
        return (
            <div>
                <div className="d-block">
                    {/* <div className="d-block pb-2 text-right heading">Properties</div>
                    <div className="form-group">
                        <select className="form-control">
                            <option>Survey</option>
                            <option>Survey</option>
                            <option>Survey</option>
                        </select>
                    </div>
                    <div className="title">Header</div> */}
                    <div>
                        <div className="form-group">
                            <label htmlFor="Title">Title</label>
                            <input type="text" className="form-control" id="Title" value={formContent["title"]} onChange={this.handleChangeFormContent} name="title" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Title">Name</label>
                            <input type="text" className="form-control" id="Name" name="name" value={formContent["name"]} onChange={this.handleChangeFormContent} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Title">Id</label>
                            <input type="text" className="form-control" id="Id" name="id" value={formContent["id"]} onChange={this.handleChangeFormContent} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Description">Notice</label>
                            <textarea className="form-control" id="Description" name="description" value={formContent["description"]} onChange={this.handleChangeFormContent}></textarea>
                        </div>
                        {
                            (formContent.type === componentType.TEXT || formContent.type === componentType.TEXT_AREA) &&
                            <div className="form-group">
                                <label htmlFor="PlaceHolder">Place holder</label>
                                <input type="text" className="form-control" id="PlaceHolder" name="placeholder" value={formContent["placeholder"]} onChange={this.handleChangeFormContent} />
                            </div>
                        }
                        {
                            formContent.isRequired != undefined &&
                            <div className="form-group form-check">
                                <input type="checkbox" checked={formContent.isRequired} onChange={this.setRequiredProperty} className="form-check-input" />
                                <label className="form-check-label">Is required</label>
                            </div>
                        }
                        {
                            formContent.isRequired &&
                            <div className="form-group">
                                <label htmlFor="errorMessage">Required message</label>
                                <textarea className="form-control" id="errorMessage" name="errorMessage" value={formContent["errorMessage"]} onChange={this.handleChangeFormContent}></textarea>
                            </div>
                        }
                        {formContent.validations &&
                            <div>
                                <div className="title pb-3">Regular expressions</div>
                                <div className="form-group">
                                    {
                                        formContent.validations.length > 0 &&
                                        <div className="d-block w-75">
                                            <label htmlFor="Value" className="d-inline-block w-50 text-center">Regex</label>
                                            <label htmlFor="Text" className="d-inline-block w-50 text-center">Required message</label>
                                        </div>
                                    }
                                    {this.renderValidations()}
                                    <button className="btn btn-primary" onClick={this.addNewValidationData}>Add New</button>
                                </div>
                            </div>
                        }
                    </div>
                    {(formContent.type === componentType.RADIO || formContent.type === componentType.CHECK_BOX || formContent.type === componentType.SELECTBOX) &&
                        <div>
                            <div className="d-block mt-3 mb-2 sub-title">Form entry</div>
                            <div className="form-group">
                                <div className="d-block w-75">
                                    <label htmlFor="Value" className="d-inline-block w-50 text-center">Value</label>
                                    <label htmlFor="Text" className="d-inline-block w-50 text-center">Text</label>
                                </div>
                                {this.renderOptions()}
                                <button className="btn btn-primary" onClick={this.addNewOption}>Add New</button>
                            </div>
                        </div>
                    }
                </div>
            </div >
        );

    }
}