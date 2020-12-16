import React, { Component } from 'react';

export class TextArea extends Component {
    titleRef = null;
    constructor(props) {
        super(props);
        this.state = {
            title: "Question",
            editTitle: false,
            isRequired: true,
            name: 'question',
            id: 'question',
            description: '',
            placeholder: 'enter name',
            errorMessage: 'This field is required.',
            validations: [],
            isActive: false
        }
        this.titleRef = React.createRef();
    };

    getContent = () => {
        const { id, name, title, isRequired, placeholder, errorMessage, description, validations } = this.state;
        return {
            id,
            name,
            title,
            isRequired,
            placeholder,
            errorMessage,
            description,
            validations,
            type: this.props.type
        };
    };

    onClickEditTitle = () => {
        this.setState({
            editTitle: true
        });
        setTimeout(() => {
            this.titleRef.current.focus();
        });
    };

    handleStateChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
        this.setProperties({ [name]: value });
    };

    onFocusOutTitle = () => {
        this.setState({
            editTitle: false
        });
    };

    toggleIsRequired = (e) => {
        e.preventDefault();
        this.setState({
            isRequired: !this.state.isRequired
        });
        this.setProperties({ isRequired: !this.state.isRequired });
    };

    setProperties = (sendData) => {
        const { title, isRequired, placeholder, name, description, id, errorMessage, validations } = this.state;
        const { type } = this.props;
        const properties = {
            type,
            title: title,
            id: id,
            name: name,
            description: description,
            isRequired: isRequired,
            errorMessage: errorMessage,
            placeholder: placeholder,
            validations: validations,
            ...sendData
        };
        this.props.setPropertiesData(properties, this.props.location);
        this.setIsActive(true);
    }

    changeProperties = (formContent) => {
        const { title, placeholder, name, description, id, errorMessage, isRequired, validations } = formContent;
        this.setState({
            title: title,
            placeholder: placeholder,
            name: name,
            id: id,
            description: description,
            errorMessage: errorMessage,
            isRequired: isRequired,
            validations: validations,
        });
        this.props.setPropertiesData(formContent, this.props.location);
    };

    onClickDelete = () => {
        this.props.onClickDelete(this.props.location);
    };

    setIsActive = (isActive) => {
        this.setState({
            isActive
        });
    };

    render() {
        const { title, editTitle, isRequired, description, errorMessage, placeholder, isActive } = this.state;
        return (
            <div className={`d-block mb-4 question-container ${isActive ? 'active' : ''}`}>
                <div className="d-block text-right pr-4 pb-1">
                    <a href={void (0)} className="float-left"><i className="fa fa-bars"></i></a>
                    <a href={void (0)} onClick={this.onClickDelete} className="d-inline-block mr-3"><i className="fa fa-times-circle"></i></a>
                    {
                        !isRequired &&
                        <a href={void (0)} onClick={this.toggleIsRequired} className="d-inline-block mr-3 required-icon"><span>/</span></a>
                    }
                    {
                        isRequired &&
                        <a href={void (0)} onClick={this.toggleIsRequired} className="d-inline-block mr-3 required-icon"></a>
                    }
                    <div className="d-inline-block mr-3"><b>Text Area</b></div>
                    <div className="d-inline-block">
                        <a href={void (0)}><i className="fa fa-edit"></i> <b onClick={() => this.setProperties({})}>Properties</b> <i className="fa fa-angle-right"></i></a>
                    </div>
                </div>
                <div className="d-block p-3 question-container-inner">
                    <div className={`pb-3 question-heading ${editTitle ? 'd-none' : 'd-block'}`}>
                        {title}
                        {
                            isRequired &&
                            <span>*</span>
                        }
                        &nbsp;
                        <a href={void (0)} onClick={this.onClickEditTitle}><i className="fa fa-edit"></i></a>
                    </div>
                    <div className={`pb-3 question-heading ${editTitle ? 'd-block' : 'd-none'}`}>
                        <input type="text" value={title} name="title" onChange={this.handleStateChange} onBlur={this.onFocusOutTitle} ref={this.titleRef} />
                        {
                            isRequired && <span>&nbsp;*</span>
                        }
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" rows={5} placeholder={placeholder}></textarea>
                        <p className="mt-1 mb-0">
                            {isRequired && errorMessage}
                        </p>
                        <p className="small mb-0">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        );

    }
}