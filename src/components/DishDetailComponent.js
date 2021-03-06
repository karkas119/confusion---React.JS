import React, {Component} from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
    Modal,
    ModalHeader,
    ModalBody,
    Col,
    Row,
    Button
} from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Link} from 'react-router-dom';
import {Loading} from "./LoadingComponent";
import {baseUrl} from "../shared/baseUrl";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);


function Comments({comment}) {
    return (
        <div>
        <div>{comment.map((comment) => {
            return (
                <div key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit'
                    }).format(new Date(Date.parse(comment.date)))}</p>
                </div>
            );
        })}
        </div>
            </div>
    )
}

class DishDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this)

    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleLogin(value) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, value.rating, value.author, value.comment);
        console.log('this.value.comment =' + value.comment);

    }

    render() {
        if (this.props.isLoading) {
            return (
                <div className='container'>
                    <div className='row'>
                        <Loading/>
                    </div>
                </div>
            )
        } else if (this.props.errMess) {
            return (
                <div className='container'>
                    <div className='row'>
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            )
        } else


            return (
                <div className='container'>
                    <div className='row'>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.dishes.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className='col-12'>
                            <h3>{this.props.dishes.name}</h3>
                        </div>
                    </div>
                    <div key={this.props.id} className='row'>
                        <div className='col-12 col-md-5 m-1'>
                            <Card>
                                <CardImg width='100%' src={baseUrl + this.props.dishes.image}
                                         alt={this.props.dishes.name}/>
                                <CardBody>
                                    <CardTitle>{this.props.dishes.name}</CardTitle>
                                    <CardText>{this.props.dishes.description}</CardText>
                                </CardBody>
                            </Card>
                        </div>
                        <div className='col-12 col-md-5 m-1'>
                            <Card>
                                <CardBody>
                                    <CardTitle>Comments</CardTitle>
                                    <CardText>
                                        <Comments comment={this.props.comment} />
                                    </CardText>

                                    <button onClick={this.toggleModal} className='btn-primary'>
                                        <span className='fa fa-sign-in fa-lg'></span>Submit Comment
                                    </button>
                                </CardBody>
                            </Card>
                            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                                <ModalBody>
                                    <LocalForm onSubmit={(value) => {
                                        this.handleLogin(value)
                                    }}>
                                        <h5>Rating</h5>
                                        <Row className='form-group'>
                                            <Col md={12}>
                                                <Control.select model='.rating' name='rating' className='form-control'>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </Control.select>
                                            </Col>
                                        </Row>
                                        <h5>Your name</h5>
                                        <Row className='form-group'>
                                            <Col md={12}>
                                                <Control.text model='.author' id='author' name='author'
                                                              placeholder='Your name'
                                                              className='form-control'
                                                              validators={{
                                                                  required,
                                                                  minLength: minLength(2),
                                                                  maxLength: maxLength(15)
                                                              }}/>
                                                <Errors
                                                    className='text-danger'
                                                    model='.author'
                                                    show='touched'
                                                    messages={{
                                                        required: 'Required',
                                                        minLength: 'Must be greater than 2 characters',
                                                        maxLength: 'Must be less than 15 ch.'
                                                    }}/>
                                            </Col>
                                        </Row>
                                        <h5>Comment</h5>
                                        <Row className='form-group'>
                                            <Col md={12}>
                                                <Control.textarea model='.comment' id='comment' name='comment' rows='6'
                                                                  className='form-control'
                                                                  placeholder='Your feedback'/>
                                            </Col>
                                        </Row>
                                        <Row className='form-group'>
                                            <Col md={10}>
                                                <Button type='submit' color='primary'>Submit</Button>
                                            </Col>
                                        </Row>
                                    </LocalForm>
                                </ModalBody>
                            </Modal>
                        </div>
                    </div>
                </div>

            )

    }

}

export default DishDetailComponent;