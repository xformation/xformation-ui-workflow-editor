import React, { Component } from 'react';

export class RadioGroup extends Component {
    titleRef = null;
    constructor(props) {
        super(props);
        this.state = {
            id: "question",
            name: "question",
            title: "Question",
            editTitle: false,
            options: [],
            value: [],
            isRequired: true,
            errorMessage: 'Error message',
            notice: '',
            isActive: false,
            radioindex: this.props.name,
        }
        this.titleRef = React.createRef();
    };

    getContent = () => {
        const { id, name, title, isRequired, options, errorMessage, notice, value } = this.state;
        return {
            id,
            name,
            title,
            isRequired,
            options,
            errorMessage,
            notice,
            value,
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

    onChangeOption = (index, e) => {
        const { value } = e.target;
        const { options } = this.state;
        options[index].label = value;
        this.setState({
            options
        });
        this.setProperties({ options });
    };

    onChangeradioState = (index, e) => {
        let { options, value } = this.state;
        let radioval = [];
        // options[index].isChecked = e.target.checked;
        value = [options[index].value];
        radioval.push(options[index].value);
        this.setState({
            options,
            value,
        })
        this.setProperties({ options, value });
    }

    onBlurOption = (index, e) => {
        const { options } = this.state;
        options[index].isEdit = false;
        this.setState({
            options
        });
    };

    onClickCopyOption = (index, e) => {
        e.preventDefault();
        const { options } = this.state;
        const length = options.length;
        let newoption = [];
        for (let i = 0; i < length; i++) {
            let option = options[i];
            if (index == i) {
                newoption.push({ ...option });
                newoption.push({ ...option });
            } else {
                newoption.push(option);
            }
        }
        this.setState({
            options: newoption
        });
        this.setProperties({ options });
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
        const { options, value, radioindex } = this.state;
        let retData = [];
        for (let j = 0; j < options.length; j++) {
            let option = options[j];
            retData.push(
                <div key={`check-${j}`} className="form-check">
                    <input type="radio" name={`radiodata-${radioindex}`} checked={value.indexOf(option.value) !== -1} onClick={(e) => this.onChangeradioState(j, e)} className="form-check-input" />
                    {
                        !option.isEdit &&
                        <label className="form-check-label">{option.label}</label>
                    }
                    {
                        option.isEdit &&
                        <input type="text" value={option.label} onChange={e => this.onChangeOption(j, e)} onBlur={e => this.onBlurOption(j, e)} />
                    }
                    <a href={void (0)} className="d-inline-block ml-2"><i className="fa fa-edit" onClick={e => this.onClickEditOption(j, e)}></i></a>
                    <a href={void (0)} className="d-inline-block ml-2"><i className="fa fa-copy" onClick={e => this.onClickCopyOption(j, e)}></i></a>
                    <a href={void (0)} className="d-inline-block ml-2"><i className="fa fa-times" onClick={e => this.onClickRemoveOption(j, e)}></i></a>
                </div>
            );
        }
        return retData;
    }

    onClickAddOption = (e) => {
        e.preventDefault();
        const { options } = this.state;
        options.push({ label: `Item ${options.length + 1}`, value: options.length + 1, isChecked: false });
        this.setState({
            options
        });
        this.setProperties({ options });
    };

    onClickEditOption = (index, e) => {
        e.preventDefault();
        const { options } = this.state;
        options[index].isEdit = true;
        this.setState({
            options
        });
    };

    setProperties = (sendData) => {
        const { id, name, title, isRequired, notice, errorMessage, options, value } = this.state;
        const { type } = this.props;
        const properties = {
            type,
            id,
            name,
            title: title,
            notice: notice,
            isRequired: isRequired,
            errorMessage: errorMessage,
            value: value,
            options: options,
            ...sendData
        };
        this.props.setPropertiesData(properties, this.props.location);
        this.setIsActive(true);
    }

    changeProperties = (formContent) => {
        const { id, name, title, isRequired, notice, errorMessage, options, value } = formContent;
        this.setState({
            id,
            name,
            title: title,
            notice: notice,
            errorMessage: errorMessage,
            options: options,
            value: value,
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
        const { title, editTitle, isRequired, notice, errorMessage, sendData, isActive } = this.state;
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
                        <a onClick={this.toggleIsRequired} className="d-inline-block mr-3 required-icon"></a>
                    }
                    <div className="d-inline-block mr-3"><b>Radio Group</b></div>
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
                    {this.renderOptions()}
                    <div className="form-group pt-3">
                        <a href={void (0)} className="d-inline-block mr-3"><i className="fa fa-plus" onClick={this.onClickAddOption}></i></a>
                    </div>
                    <p className="mb-0">
                        {errorMessage}
                    </p>
                    <p className="small mb-0">
                        {notice}
                    </p>
                </div>
            </div>
        );
    }
}