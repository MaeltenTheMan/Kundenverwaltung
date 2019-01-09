import React, { Component, Fragment } from 'react'
import Button from '@material-ui/core/Button'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { FormControl } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';

const url = 'http://localhost:8080/customers'

class Create extends Component {

  state = {
    open: false,
    customer: {
      name: '',
      lastName: '',
      gender: '',
      street: '',
      postCode: '',
      city: ''
    }
  }

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    })
  }

  handleChange = name => ({ target: { value } }) => {

    this.setState({
      customer: {
        ...this.state.customer,
        [name]: value
      }

    })
  }

  submit = () => {

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(this.state.customer),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.json()
      }).then((data) => {
      this.props.addCustomer(data)
      this.setState({
        open: false,
        customer: {
          name: '',
          lastName: '',
          gender: '',
          street: '',
          postCode: '',
          city: ''
        }
      })
    }).catch(function (error) {
      console.log(error.message)
    })

  }

  render () {
    let { open, customer: { name, lastName, gender, street, postCode, city } } = this.state
    return <Fragment>
      <Button title='Neuer Kunde' variant='contained' color='primary' onClick={this.handleToggle}><i
        className='material-icons'>add</i></Button>
      <Dialog
        open={open}
        onClose={this.handleToggle}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Neuer Kunde</DialogTitle>
        <ValidatorForm
          ref='form'
          onSubmit={this.submit}
          onError={errors => console.log(errors)}
        >
          <DialogContent>
            <TextValidator
              name='name'
              label='Vorname'
              type='text'
              value={name}
              validators={['required']}
              errorMessages={['Geben Sie einen Vornamen ein']}
              onChange={this.handleChange('name')}
              fullWidth
            />
            <TextValidator
              margin='dense'
              name='lastName'
              label='Nachname'
              type='text'
              value={lastName}
              validators={['required']}
              errorMessages={['Geben Sie einen Nachnamen ein']}
              onChange={this.handleChange('lastName')}
              fullWidth
            />
            <FormControl fullWidth>
              <SelectValidator
                value={gender}
                name='gender'
                label='Geschlecht'
                validators={['required']}
                errorMessages={['Geben Sie einen Nachnamen ein']}
                onChange={this.handleChange('gender')}
              >
                <MenuItem value={'männlich'}>männlich</MenuItem>
                <MenuItem value={'weiblich'}>weiblich</MenuItem>
              </SelectValidator>
            </FormControl>
            <TextValidator
              margin='dense'
              name='street'
              label='Straße'
              type='text'
              value={street}
              validators={['required']}
              errorMessages={['geben Sie eine Straße ein']}
              onChange={this.handleChange('street')}
              fullWidth
            />
            <TextValidator

              margin='dense'
              name='postCode'
              label='Postleitzahl'
              type='number'
              value={postCode}
              validators={['required']}
              errorMessages={['Geben Sie eine Postleitzahl ein']}
              onChange={this.handleChange('postCode')}
              fullWidth
            />
            <TextValidator

              margin='dense'
              name='city'
              label='Ort'
              type='text'
              value={city}
              validators={['required']}
              errorMessages={['Geben Sie eine Stadt ein']}
              onChange={this.handleChange('city')}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleToggle} color='primary'>
              Schließen
            </Button>
            <Button type='submit' color='primary'>
              Senden
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>

    </Fragment>
  }
}
export default Create


