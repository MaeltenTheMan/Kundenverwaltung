import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, InputLabel, Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';


const url = "http://localhost:8080/customers";

class Change extends Component {
    state = {   open: false,
        customer : {
            name: '',
            lastName: '',
            gender: '',
            street: '',
            postCode: '',
            city: ''
        }
    } 

    handleToggle= () => {

        this.setState({
            open: !this.state.open
         });

            fetch(url + "/" + this.props.id, {
                method: "get"
            })
            .then(results => {
                return results.json();
            }).then(data=> {
                this.setState({
                
                    customer: data
                });
            });
    }

    handleChange = name => ({target: { value }}) => {
        
        this.setState({
            customer : {
                ...this.state.customer,
                [name]: value
            }
        });
    }

    submit = () => {
  
        fetch(url + "/" + this.props.id, {
            method: "PUT",
            body: JSON.stringify(this.state.customer),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            return response.json();
        }).then((data)=> {
            this.props.changeCustomer(data);
            this.setState({
                open: false,
                customer:  {
                    name: '',
                    lastName: '',
                    gender: '',
                    street: '',
                    postCode: '',
                    city: ''
                }
            });
        });
    };

    
    handleChange = name => ({target: { value }}) => {
        
        this.setState({
            customer : {
                ...this.state.customer,
                [name]: value
            }
        });
    }

    render() {
        let {open, customer: { name, lastName, gender, street, postCode, city } } = this.state
        return <Fragment>
            <Button variant="contained"  color="primary" title="Bearbeiten" onClick={() => this.handleToggle(this.props.id)}><i className="material-icons">build</i></Button>
            <Dialog
                open={open}
                onClose={this.handleToggle}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Kunde bearbeiten</DialogTitle>
                <form>
                <DialogContent>
                    
                <TextField
                    id="name"
                    label="Vorname"
                    type="text"
                    value={name}
                    onChange={this.handleChange('name')}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="lastName"
                    label="Nachname"
                    type="text"
                    value={lastName}
                    onChange={this.handleChange('lastName')}
                    fullWidth
                />
                <FormControl fullWidth>
                    <InputLabel htmlFor="gender">
                        Geschlecht
                    </InputLabel>
                    <Select 
                        value={gender} 
                        onChange={this.handleChange('gender')}
                    >
                        <MenuItem value={"männlich"}>männlich</MenuItem>
                        <MenuItem value={"weiblich"}>weiblich</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    margin="dense"
                    id="street"
                    label="Straße"
                    type="text"
                    value={street}
                    onChange={this.handleChange('street')}
                    fullWidth
                />
                <TextField
            
                    margin="dense"
                    id="postCode"
                    label="Postleitzahl"
                    type="number"
                    value={postCode}
                    onChange={this.handleChange('postCode')}
                    fullWidth
                />
                <TextField
               
                    margin="dense"
                    id="city"
                    label="Ort"
                    type="text"
                    value={city}
                    onChange={this.handleChange('city')}
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleToggle} color="primary">
                    Schließen
                </Button>
                <Button onClick={e => this.submit(e)} color="primary">
                    Senden
                </Button>
                </DialogActions>
                </form>
            </Dialog> 
            
        </Fragment> 

    }
}


 
export default Change;