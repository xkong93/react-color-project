import React, {Component} from 'react'
import {ChromePicker} from "react-color"
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator"


class ColorPickerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentColor: "teal",
            newColorName: "",

        }
    }
    componentDidMount() {
        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
            this.props.colors.every(
                ({name}) => name.toLowerCase() !== value.toLowerCase()
            )
        );

        ValidatorForm.addValidationRule('isColorUnique', (value) =>
            this.props.colors.every(
                ({color}) => color !== this.state.currentColor
            )
        );


    }
    updateCurrentColor = (newColor) => {
        this.setState({
            currentColor: newColor.hex
        })
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = () => {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName

        }
        console.log(newColor)
        this.props.addNewColor(newColor)
    }
    render() {
        const {paletteIsFull} = this.props;
        return (
            <div>
                <ChromePicker color={this.state.currentColor} onChangeComplete={this.updateCurrentColor}/>
                <ValidatorForm onSubmit={this.handleSubmit} ref='form'>
                    <TextValidator value={this.state.newColorName}
                                   name="newColorName"
                                   onChange={this.handleChange}
                                   validators={['required', 'isColorUnique', 'isColorNameUnique']}
                                   errorMessages={['Enter a color name', 'Color already used!', 'Color name must be unique']}
                    />

                    <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        style={{backgroundColor: paletteIsFull ? "grey" : this.state.currentColor}}
                        disabled={paletteIsFull}
                    >
                        {paletteIsFull ? "Palette Full" : "Add Colors"}
                    </Button>
                </ValidatorForm>
            </div>
        );
    }
}

export default ColorPickerForm;
