import {Form} from 'react-bootstrap';

export default ({range, onSelect}) => (
    <Form >
        <Form.Group style={{display: 'flex'}}>
            <Form.Label className="mr-2">элм'ов/стр</Form.Label>
            <Form.Control 
                as="select" 
                onChange={(e) => onSelect(e.target.value)}
                style={{
                    width: 'auto'
                }}
            >
                {range.map(v => (<option style={{display: 'inline-block'}} value={v}> {v} </option>))}
            </Form.Control>
        </Form.Group>
    </Form>
)