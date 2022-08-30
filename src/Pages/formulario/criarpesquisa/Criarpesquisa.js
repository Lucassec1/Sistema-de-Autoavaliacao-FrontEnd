import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import { BsArrowLeftShort } from "react-icons/bs";
import { useForm } from "react-hook-form";
import './tete.css';
function OffcanvasExample() {
    function voltar() {
        window.history.back();
    }
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
    const onSubmit = dat => console.log(dat);
    console.log(onSubmit);
     function lucas(){

     }
    return (
        <>
            <div>
                <div id='teste'>
                    <Navbar variant="primary" style={{ color: '#fff' }} expand="lg">
                        <Container>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="/pesquisas"> <BsArrowLeftShort /></Nav.Link>
                                    <Nav.Link href="/criarpesquisa"> Criar Pesquisa</Nav.Link>
                                    <Nav.Link href="/home">Minhas Pesquisa</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>

                <Row className="justify-content-md-center mt-5">
                    <div className="form">
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                               <div>
                                   <h5> Ex. de formulario</h5>
                                   <h6> voce gostou de tal coisa</h6>
                               </div>
                               <input type='number' placeholder='1, 2, 3....'
                               {...register("numero", { required: true })}
                               style={{borderRadius:'0.5rem', width:'60%', height:'30px'}}
                               ></input>
                               <p>escolha de 1 a 10, sendo 1 ruim e 10 bom</p>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </Row>
            </div>
        </>
    );
}

export default OffcanvasExample;