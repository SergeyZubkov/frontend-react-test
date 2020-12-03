import React,{Component} from 'react';
import {InputGroup, FormControl, Button} from 'react-bootstrap';

export default class AnimeSearch extends Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
    }
    state = {
        isActive: false
    }
    render() {
        return (
            <InputGroup className="mb-5">
                <FormControl ref={this.input} disabled={this.state.isActive}/>
                <InputGroup.Append>
                {
                    this.state.isActive
                    ? (
                        <Button 
                        variant="danger"
                        onClick={this.abort}
                        >
                            Отмена
                        </Button>
                    )
                    : (<Button 
                        variant="outline-secondary"
                        onClick={this.search}
                        >
                            Найти
                        </Button>
                    )
                }
                </InputGroup.Append>
            </InputGroup>
        )
    }
    abort = () => {
        this.setState(({isActive}) => ({isActive: !isActive}));
        this.input.current.value = '';
        this.props.onSearch("")
    }
    search = () => {
        this.setState(({isActive}) => ({isActive: !isActive}));
        this.props.onSearch(this.input.current.value);
    }
}