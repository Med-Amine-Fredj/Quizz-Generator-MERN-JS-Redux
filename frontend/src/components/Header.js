import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'


const Header = () => {
    return (
        <header>
            <Navbar className='navbar navbar-expand-lg navbar-dark bg-primary' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                    <Navbar.Brand > <i className='fa fa-grin-squint'></i> LiveQuizZ</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to='/admin/myquizz'>
                            <Nav.Link> <i className='fa fa-question-circle'></i> Mes QuizZ</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/admin/utilisateurs'>
                            <Nav.Link ><i className='fa fa-users'></i> Mes Utilisateurs  </Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav className="ml-auto">
                        <NavDropdown title="Utilisateur En Ligne" id="basic-nav-dropdown">
                            <NavDropdown.Item >Utilisateur1</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>Utilisateur2</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Admin Name" id="basic-nav-dropdown">
                            <LinkContainer to='/admin/compte'>    
                            <NavDropdown.Item ><i className='fa fa-sliders-h'></i> Gérer Compte </NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Divider />
                            <LinkContainer to='/logout'>
                            <NavDropdown.Item ><i className='fa fa-sign-out-alt'> Logout </i></NavDropdown.Item>
                            </LinkContainer>
                            </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
