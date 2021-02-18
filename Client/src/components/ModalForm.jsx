import React, { Component } from 'react'

import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'

import { AddEditForm, ConvertorForm } from "./"

class ModalForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            modal: false
         }
    }

    toggle = () => {
        this.setState(prevState => ({
          modal: !prevState.modal
        }))
    }

    render() { 

            const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>

            const label = this.props.buttonLabel

            let button = ''
            let title = ''

            if(label === 'Edit'){
                button = <Button
                        color="warning"
                        onClick={this.toggle}
                        style={{float: "left", marginRight:"10px"}}>{label}
                        </Button>
                title = 'Edit Coin'
            } 
            else {
                button = <Button
                        color="success"
                        onClick={this.toggle}
                        style={{float: label === "Convertor" ? "right" : "left", marginRight:"10px"}}>{label}
                        </Button>
                title = label === "Convertor" ? "Convertor" : "Add New Coin"
            }

        return ( 
            <div>
            {button}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
                    <ModalBody>
                        {label === "Convertor" ? 
                            <ConvertorForm
                            coinsTypes = {this.props.coinsTypes}
                            currencyTypes = {this.props.currencyTypes}
                            />
                            :
                            <AddEditForm
                            addItemToState={this.props.addItemToState}
                            updateState={this.props.updateState}
                            toggle={this.toggle}
                            item={this.props.item} 
                            coinsTypes = {this.props.coinsTypes}
                            currencyTypes = {this.props.currencyTypes}
                            />
                        }
                    </ModalBody>
                </Modal>
            </div>
         );
    }
}
 
export default ModalForm;