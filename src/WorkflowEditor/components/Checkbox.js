import React, { Component } from 'react';

export class Checkbox extends Component {
    titleRef = null;
    constructor(props) {
        super(props);
        this.state = {
            id: "question",
            name: "question",
            title: "Question",
            editTitle: false,
            isRequired: true,
            options: [],
            errorMessage: 'Error message',
            description: '',
            isActive: false
        }
        this.titleRef = React.createRef();
    };

    getContent = () => {
        const {id, name, title, isRequired, options, errorMessage, description} = this.state;
        return {
            id,
            name,
            title,
            isRequired,
            options,
            errorMessage,
            description,
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

    onChangeOption = (index, e) => {
        const { value } = e.target;
        const { options } = this.state;
        options[index].label = value;
        this.setState({
            options
        });
        this.setProperties({ options });
    };

    onBlurOption = (index, e) => {
        const { options } = this.state;
        options[index].isEdit = false;
        this.setState({
            options
        });
    };

    onClickEditOption = (index, e) => {
        e.preventDefault();
        const { options } = this.state;
        options[index].isEdit = true;
        this.setState({
            options
        });
    };

    onClickCopyOption = (index, e) => {
        e.preventDefault();
        const { options } = this.state;
        const length = options.length;
        let newOptions = [];
        for (let i = 0; i < length; i++) {
            let option = options[i];
            if (index == i) {
                newOptions.push({...option});
                newOptions.push({...option});
            } else {
                newOptions.push(option);
            }
        }
        this.setState({
            options: newOptions
        });
        this.setProperties({ options: newOptions });
    }

    onClickRemoveOption = (index, e) => {
        e.preventDefault();
        const { options } = this.state;
        options.splice(index, 1);
        this.setState({
            options
        });
        this.setProperties({ options });
    };

    renderOptions = () => {
        const { options } = this.state;
        let retData = [];
        const length = options.length;
        for (let i = 0; i < length; i++) {
            let option = options[i];
            retData.push(
                <div key={`check-${i}`} className="form-check">
                    <input type="checkbox" className="form-check-input" />
                    {
                        !option.isEdit &&
                        <label className="form-check-label">{option.label}</label>
                    }
                    {
                        option.isEdit &&
                        <input type="text" value={option.label} onChange={e => this.onChangeOption(i, e)} onBlur={e => this.onBlurOption(i, e)} />
                    }
                    <a href={void(0)} className="d-inline-block ml-2" onClick={e => this.onClickEditOption(i, e)}><i className="fa fa-edit" ></i></a>
                    <a href={void(0)} className="d-inline-block ml-2" onClick={e => this.onClickCopyOption(i, e)}><i className="fa fa-copy"></i></a>
                    <a href={void(0)} className="d-inline-block ml-2" onClick={e => this.onClickRemoveOption(i, e)}><i className="fa fa-times"></i></a>
                </div>
            );
        }
        return retData;
    }

    toggleIsRequired = (e) => {
        e.preventDefault();
        this.setState({
            isRequired: !this.state.isRequired
        });
        this.setProperties({ isRequired: !this.state.isRequired });
    };

    onClickAddOption = (e) => {
        e.preventDefault();
        const { options } = this.state;
        options.push({ label: `Item ${options.length + 1}`, value: options.length + 1 });
        this.setState({
            options
        });
        this.setProperties({ options });
    };

    setProperties = (sendData) => {
        const { id, name, title, isRequired, description, errorMessage, options } = this.state;
        const { type } = this.props;
        const properties = {
            type,
            id,
            name,
            title: title,
            description: description,
            isRequired: isRequired,
            errorMessage: errorMessage,
            options: options,
            ...sendData
        };
        this.props.setPropertiesData(properties, this.props.location);
        this.setIsActive(true);
    }

    changeProperties = (formContent) => {
        const { id, name, title, isRequired, description, errorMessage, options } = formContent;
        this.setState({
            id,
            name,
            title: title,
            description: description,
            errorMessage: errorMessage,
            options: options,
            isRequired: isRequired
        });
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
        const { title, editTitle, isRequired, description, errorMessage, sendData, isActive } = this.state;
        return (
            <div className={`d-block mb-4 question-container ${isActive ? 'active' : ''}`}>
                <div className="d-block text-right pr-4 pb-1">
                    <a href={void(0)} className="float-left"><i className="fa fa-bars"></i></a>
                    <a href={void(0)} onClick={this.onClickDelete} className="d-inline-block mr-3"><i className="fa fa-times-circle"></i></a>
                    {
                        !isRequired &&
                        <a href={void(0)} onClick={this.toggleIsRequired} className="d-inline-block mr-3 required-icon"><span>/</span></a>
                    }
                    {
                        isRequired &&
                        <a href={void(0)} onClick={this.toggleIsRequired} className="d-inline-block mr-3 required-icon"></a>
                    }
                    <div className="d-inline-block mr-3"><b>Singel Input</b></div>
                    <div className="d-inline-block">
                        <a href={void(0)}><i className="fa fa-edit"></i> <b onClick={() => this.setProperties({})}>Properties</b> <i className="fa fa-angle-right"></i></a>
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
                        <a href={void(0)} onClick={this.onClickEditTitle}><i className="fa fa-edit"></i></a>
                    </div>
                    <div className={`pb-3 question-heading ${editTitle ? 'd-block' : 'd-none'}`}>
                        <input type="text" value={title} name="title" onChange={this.handleStateChange} onBlur={this.onFocusOutTitle} ref={this.titleRef} />
                        {
                            isRequired && <span>&nbsp;*</span>
                        }
                    </div>
                    {this.renderOptions()}
                    {errorMessage}
                    <div className="form-group pt-3">
                        <a href={void(0)} className="d-inline-block mr-3" onClick={this.onClickAddOption}><i className="fa fa-plus"></i></a>
                    </div>
                    {description}
                </div>
            </div>
        );
    }
}