import React, { Component } from 'react';

export class SelectOption extends Component {
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
            value: '1',
            errorMessage: 'Error message',
            notice: '',
            isActive: false
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
        this.setProperties({ options: newoption });
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
        for (let i = 0; i < options.length; i++) {
            let option = options[i];
            retData.push(
                <div key={`check-${i}`} className="form-check">
                    {
                        !option.isEdit &&
                        <label className="form-check-label">{option.label}</label>
                    }
                    {
                        option.isEdit &&
                        <input type="text" value={option.label} onChange={e => this.onChangeOption(i, e)} onBlur={e => this.onBlurOption(i, e)} />
                    }
                    <a href={void (0)} className="d-inline-block ml-2" onClick={e => this.onClickEditOption(i, e)}><i className="fa fa-edit" ></i></a>
                    <a href={void (0)} className="d-inline-block ml-2" onClick={e => this.onClickCopyOption(i, e)}><i className="fa fa-copy"></i></a>
                    <a href={void (0)} className="d-inline-block ml-2" onClick={e => this.onClickRemoveOption(i, e)}><i className="fa fa-times"></i></a>
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

    onChangeOption = (index, e) => {
        const { value } = e.target;
        const { options } = this.state;
        options[index].label = value;
        this.setState({
            options
        });
        this.setProperties({ options });
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
        const { id, name, title, isRequired, notice, errorMessage, options, value } = this.state;
        const { type } = this.props;
        const properties = {
            type,
            id,
            name,
            value,
            title: title,
            notice: notice,
            isRequired: isRequired,
            errorMessage: errorMessage,
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
            isRequired: isRequired,
            value: value
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
        const { title, editTitle, isRequired, notice, errorMessage, sendData, isActive, value } = this.state;
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
                    <div className="d-inline-block mr-3"><b>Drop Down</b></div>
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
                    <div className="form-group mb-1">
                        <a href={void (0)} className="d-inline-block mr-3"><i className="fa fa-plus" onClick={this.onClickAddOption}></i></a>
                    </div>
                    <p className="mb-0">
                        {errorMessage}
                    </p>
                    <p className="small mb-0">
                        {notice}
                    </p>
                </div>
            </div >
        );
    }
}