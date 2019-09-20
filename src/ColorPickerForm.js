import React, {Component} from 'react'
import {ChromePicker} from "react-color"
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator"
import {withStyles} from '@material-ui/core/styles';


const styles = {
    picker: {
        width: "100% !important",
        marginTop: "2rem"
    },
    addColor: {
        width: "100%",
        padding: "1rem",
        marginTop: "1rem",
        fontSize: "2rem"
    },
    colorNameInput: {
        width:"100%",
        height:"70px"

    }
}

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
        const {paletteIsFull, classes} = this.props;
        return (
            <div>
                <ChromePicker
                    color={this.state.currentColor}
                    onChangeComplete={this.updateCurrentColor}
                    className={classes.picker}
                                />
                <ValidatorForm onSubmit={this.handleSubmit} ref='form'>
                    <TextValidator value={this.state.newColorName}
                                   className={classes.colorNameInput}
                                   name="newColorName"
                                   margin="normal"
                                   placeholder="Color Name"
                                   variant="filled"
                                   onChange={this.handleChange}
                                   validators={['required', 'isColorUnique', 'isColorNameUnique']}
                                   errorMessages={['Enter a color name', 'Color already used!', 'Color name must be unique']}
                    />

                    <Button
                        className={classes.addColor}
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

export default withStyles(styles)(ColorPickerForm);
