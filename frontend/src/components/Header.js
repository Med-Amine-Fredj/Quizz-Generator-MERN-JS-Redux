import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown,} from 'react-bootstrap'
import { logout } from '../actions/userActions'

const Header = () => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)

    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }


    return (
        <header>
            <Navbar className='navbar navbar-expand-lg navbar-dark bg-primary' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                    <Navbar.Brand > <i className='fa fa-grin-squint'></i> LiveQuizZ</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        { userInfo && userInfo.isAdmin && (
                            <Nav className="me-auto">
                            <LinkContainer to='/admin/myquizz'>
                                <Nav.Link> <i className='fa fa-question-circle'></i> Mes QuizZ </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/admin/userslist'>
                                <Nav.Link ><i className='fa fa-users'></i> Mes Utilisateurs  </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/admin/usergroups'>
                                <Nav.Link ><i className='fa fa-users'></i> Mes Groupes </Nav.Link>
                            </LinkContainer>
                            </Nav>
                        )}

                    </Navbar.Collapse>
               
                    {userInfo ? (
                        <Nav className="ml-auto">
                        <NavDropdown title={userInfo.nomUtilisateur} id="basic-nav-dropdown">
                            <LinkContainer to='/profile'>    
                            <NavDropdown.Item ><i className='fa fa-sliders-h'></i> Gérer Compte </NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Divider />
                            <LinkContainer to='/'>
                            <NavDropdown.Item onClick={logoutHandler} ><i className='fa fa-sign-out-alt'> Se Déconnecter </i></NavDropdown.Item>
                            </LinkContainer>
                            </NavDropdown>
                            </Nav>
                    ) : 
                    <Nav className="ml-auto">
                        <LinkContainer to='/login'>
                            <Nav.Link ><i className='fa fa-user'></i> Se Connecter </Nav.Link>
                        </LinkContainer>
                    </Nav>
                        }
                         {/*<Nav className="ml-auto">
                        <NavDropdown title="Utilisateur En Ligne" id="basic-nav-dropdown">
                            <NavDropdown.Item >Utilisateur1<Image src='/images/onlinedot.png' style={{height: '20px', width: '20px', float: 'right', verticalAlign: 'center'}} ></Image></NavDropdown.Item>
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
                         </Nav> */}
                
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
