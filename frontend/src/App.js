import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { Container, } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import QuizScreen from './screens/QuizScreen'
import QuizzDetailScreen from './screens/QuizzDetailScreen'
import QuizzEditScreen from './screens/QuizzEditScreen'
import UsersScreen from './screens/UsersScreen'
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserEditScreen from './screens/UserEditScreen'
import UserAddScreen from './screens/UserAddScreen'
import GroupeListScreen from './screens/GroupeListScreen'
import GroupeAddScreen from './screens/GroupeAddScreen'
import GroupeEditScreen from './screens/GroupeEditScreen'
import QuestionAddScreen from './screens/QuestionAddScreen'
import ReponseScreen from './screens/ReponseScreen'
import QuestionReponseScreen from './screens/QuestionReponseScreen'
import QuizzResultScreen from './screens/QuizzResultScreen'




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
          <Route path='/admin/myquizz/:id/edit' component={QuizzEditScreen} exact/>
          <Route path='/admin/myquizz/:id/addquestion' component={QuestionAddScreen} />
          <Route path='/admin/myquizz/:id/results' component={QuizzResultScreen} />
          <Route path='/admin/groupes/:id/edit' component={GroupeEditScreen} exact/>
          <Route path='/admin/groupes/addgroup' component={GroupeAddScreen} exact/>
          <Route path='/admin/groupes' component={GroupeListScreen} exact/>
          <Route path='/admin/userslist' component={UsersScreen} exact/>
          <Route path='/admin/user/:id/edit' component={UserEditScreen} exact/>
          <Route path='/admin/users/adduser' component={UserAddScreen} exact/>
          <Route path='/reponse/:id' component={ReponseScreen} exact/>
          <Route path='/reponse/:id/question/:id' component={QuestionReponseScreen} exact/>


          <Route path='/' component={HomeScreen} exact/>
        </Container>
      </main>
      <Footer /> 
    </Router>
  );
}

export default App;
