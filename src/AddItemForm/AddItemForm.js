import React, {Component} from 'react';
import {Form, Button, Card, Accordion} from 'react-bootstrap';

export default class AddItemForm extends Component {
    state = {
        formIsVisible: false,
        canonicalTitle: '',
        popularityRank: '',
        startDate: ''
    }
    render() {
        return (
            // <div className="add-item-form mb-5">
            //         <Form.Group style={{overflow: 'hidden', height: this.state.formIsVisible ? "auto" : "0", padding: '0px 5px'}}>
            //             <Form.Row>
            //                 <Form.Label >
            //                 Title
            //                 </Form.Label>
            //                 <Form.Control type="text" name="canonicalTitle" value={this.state.canonicalTitle} onChange={this.handleChange}/>
            //             </Form.Row>
            //             <br />
            //             <Form.Row>
            //                 <Form.Label >
            //                 Popularity raiting
            //                 </Form.Label>
            //                 <Form.Control type="text" name="popularityRank" value={this.state.popularityRank} onChange={this.handleChange}/>
            //             </Form.Row>
            //             <br />
            //             <Form.Row>
            //                 <Form.Label >
            //                 Created At
            //                 </Form.Label>
            //                 <Form.Control type="text" name="startDate" value={this.state.startDate} onChange={this.handleChange}/>
            //             </Form.Row>
            //             <br />
            //         </Form.Group>
            //     <Button onClick={this.addItem} disabled={this.state.formIsVisible&&!this.formFill()}> Добавить </Button>
            // </div>
            <Accordion>
                <Card>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Form.Group >
                             <Form.Row>
                                 <Form.Label >
                                 Title
                                 </Form.Label>
                                 <Form.Control type="text" name="canonicalTitle" value={this.state.canonicalTitle} onChange={this.handleChange}/>
                             </Form.Row>
                             <br />
                             <Form.Row>
                                 <Form.Label >
                                 Popularity raiting
                                 </Form.Label>
                                 <Form.Control type="text" name="popularityRank" value={this.state.popularityRank} onChange={this.handleChange}/>
                             </Form.Row>
                             <br />
                             <Form.Row>
                                 <Form.Label >
                                 Created At
                                 </Form.Label>
                                 <Form.Control type="text" name="startDate" value={this.state.startDate} onChange={this.handleChange}/>
                             </Form.Row>
                             <br />
                         </Form.Group>
                        </Card.Body>
                    </Accordion.Collapse>
                    <Card.Header>
                        <Accordion.Toggle 
                            as={Button}  
                            eventKey="0"
                            onClick={this.addItem} 
                            disabled={this.state.formIsVisible&&!this.formFill()}
                            className='mr-5'
                        >
                        Добавить
                        </Accordion.Toggle>
                        {
                            this.state.formIsVisible&&<Accordion.Toggle as={Button} variant='danger' onClick={this.abort} eventKey="0"> Отмена </Accordion.Toggle>
                        }
                    </Card.Header>
                </Card>
            </Accordion>
        )
    }

    addItem = () => {
        if (this.formFill()) {
            const {formIsVisible, ...rest} = this.state;
            this.props.onAddItem(rest)
        }
        this.setState(
            ({formIsVisible}) => ({
                formIsVisible: !formIsVisible,
                canonicalTitle: '',
                popularityRank: '',
                startDate: ''
            })
        );
    }

    handleChange = e => {
        this.setState(
            {[e.target.name]: e.target.value}            
        )
    }

    formFill = () => {
        let {canonicalTitle, popularityRank, startDate, formIsVisible} = this.state;
        return canonicalTitle&&popularityRank&&startDate
    }

    abort = () => {
        this.setState(
            ({formIsVisible}) => ({
                formIsVisible: !formIsVisible,
                canonicalTitle: '',
                popularityRank: '',
                startDate: ''
            })
        );
    }
}