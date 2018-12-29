import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Create from './dialogs/create';
import Change from './dialogs/change';
import TextField from '@material-ui/core/TextField';

const url = "http://localhost:8080/customers";

class Dashboard extends Component {

    state = { customers:[], 
        search : {
            surname: ''
        },}
    
    componentDidMount= () => {
        fetch(url, {
            method: "get"
        })
        .then(results => {
            return results.json();
        }).then(data=> {
            this.setState({
                isLoaded: true,
                customers: data
            });
        },
        (error)=>{this.setState({
            isLoaded: true,
            error
        })})
    }

    deleteMethod = (id) => {
        return fetch(url + '/' + id, {
            method: 'delete'
        }).then(response =>{
            this.deleteCustomer(id);
            return response;
        });
    }

    deleteCustomer = (id) =>{
        let newCustomers = this.state.customers.filter(customer => customer._id !== id);
        this.setState({customers: newCustomers})   
    }


    addCustomer = (custo)=>{
        let newCustomers = [...this.state.customers, custo]
        this.setState({customers: newCustomers})
    }

    changeCustomer = (custo)=>{
        let newCustomers = this.state.customers.map(customer => {
            if(customer._id === custo._id){
                return custo;
            } else {
                return customer;
            }
        });
        this.setState({customers: newCustomers});
    }

    
    handleChange = name => ({target: { value }}) => {
        
        this.setState({
            search : {
                ...this.state.search,
                [name]: value
            }
        });
    }


    searchCustomer = () => {
        fetch(url + "?lastName=" + this.state.search.surName, {
            method: "GET",
        })
        .then(response => {
            return response.json();
        }).then((data)=> {
           this.setState ( {customers : data});
          

        });
    }



    render() { 
        const {error, isLoaded, customers, surName} = this.state;
        
        if(error){
            return <div>Error: {error.message}</div>
        }
        else if(!isLoaded){
            return <div>...Loading</div>
        }
        else{
            return (
                <Paper className="paper">
                <Create  addCustomer={this.addCustomer}
                />
                <br/>
                 
        <TextField
            margin="dense"
            id="lastName"
            label="Nachname suchen"
            type="text"
            value={surName}
            onChange={this.handleChange('surName')}
            
        />
         <Button title="Kunden Nachname suchen" variant="contained" color="primary" onClick={() => this.searchCustomer()}><i className="material-icons">search</i></Button>
                <Table className="table">
                <TableHead>
                <TableRow>
                    <TableCell align="left">Vorname</TableCell>
                    <TableCell align="left">Nachname</TableCell>
                    <TableCell align="left">Geschlecht</TableCell>
                    <TableCell align="left">Straße</TableCell>
                    <TableCell align="left">Postleitzahl</TableCell>
                    <TableCell align="left">Ort</TableCell>
                    <TableCell align="center">Bearbeiten</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {customers.map(row =>{
                        return ( 
                        <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.lastName}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.gender}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.street}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.postCode}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.city}
                            </TableCell>
                            <TableCell component="th" scope="row" align="center">
                                <Change id={row._id} changeCustomer={this.changeCustomer} />
                                <Button variant="contained" title="Löschen" color="secondary" onClick={() => this.deleteMethod(row._id)}><i className="material-icons">clear</i></Button>
                            </TableCell>
                        </TableRow>
                        )
                    })}
                </TableBody>
           
                </Table>
                </Paper>
            );
        }
    }
}
 
export default Dashboard;