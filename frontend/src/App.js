import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { Container, } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import QuizScreen from './screens/QuizScreen'
import QuizzDetailScreen from './screens/QuizzDetailScreen'
import UsersScreen from './screens/UsersScreen'
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen'



function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/login' component={LoginScreen} exact/>
          <Route path='/profile' component={ProfileScreen} exact/>
          <Route path='/admin/myquizz' component={QuizScreen} exact/>
          <Route path='/admin/myquizz/:id' component={QuizzDetailScreen} exact/>
          <Route path='/admin/utilisateurs' component={UsersScreen} exact/>
          <Route path='/' component={HomeScreen} exact/>
        </Container>
      </main>
      <Footer /> 
    </Router>
  );
}

export default App;
