import React, { useEffect } from 'react'
import { Card, Table} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'



const ResultQuestion = ( { ques } ) => {
    

    const responseListByQuizz = useSelector(state => state.responseListByQuizz)
    const {loading, error, responseListByQuizz: response } = responseListByQuizz

    const userList = useSelector(state => state.userList)
    const {loading: loadingU, error: errorU, users } = userList

    const groupesList = useSelector(state => state.groupesList)
    const {loading: loadingG,error: errorG, groupes } = groupesList

    let minTemps = []

    useEffect(() => {
    }, [])


    return (
        <>
            <Card className='card border-secondary mt-3 mb-3 p-3'>
            <Card.Body className='text-center p-1'>
                <Card.Title as='div'  />
                <div style={{ textAlign: 'right'}}> 
                <h5 className='text-center'> <strong style={{color: '#11246F'}} >Titre Question : {ques.titreQuestion} </strong></h5>   

                </div>        
            </Card.Body>   
            <Card.Text as='div' >
                <strong  style={{color: '#21662F'}}>Choix Disponible : </strong>
                    { ques.choixQuestion.map(q => (
                        <>{q}/ </>
                    ))}
            </Card.Text> 
            <Card.Text as='div' >
            <strong  style={{color: '#21662F'}}>Le(s) Réponse(s) : </strong>
                { ques.reponseQuestion.map(q  => (
                   <> {q} / </> 
                ))}
            </Card.Text>  
            <Card.Text as='div' >
            <strong  style={{color: '#21662F'}}> Temps De Réponse : </strong> {ques.tempsQuestion} Secondes
            </Card.Text>  
        </Card> 

        {loadingG || loadingU || loading ? <Loader/> : error || errorU || errorG ? <Message varaint='danger'>{error || errorU || errorG }</Message> : (
            <Table striped bordered hover responsive className='table-sm mt-4'>
        <thead>
                  <tr>
                    <th>NOM</th>
                    <th>GROUPES</th>
                    <th>LES REPONSES</th>
                    <th>TEMPS DE REPONSE</th>
                    <th>LES PLUS RAPIDES</th>
                  </tr>
                </thead>
              <tbody>
            {response.map((a) => (
                ques._id === a.idQuestion && (
                    minTemps.push(a.tempsReponse),
                    <tr>
                        {users.map((user) => (
                            user._id === a.idUtilisateur && 
                            <td>{user.nomUtilisateur}</td> ))}
                        {users.map((user) => (
                            user._id === a.idUtilisateur && 
                            <td>{user.nomUtilisateur}</td> && (
                        <td>
                        {groupes.map((groupe) => (
                            groupe.nomMembres.map((nom) => (
                                nom === user.nomUtilisateur &&
                                <p>{groupe.nomGroupe} </p>
                            )) 
                        )) } </td>  )
                        ))} 
                        <td> 
                        {a.reponse.map((rep) => (
                                ques.reponseQuestion.includes(rep) ?
                                <p style={{color: '#18D700'}}> {rep} </p> : 
                                <p style={{color: '#F90B04'}}>{rep} </p> 
                            )
                        )} 
                        </td> 
                      <td className='text-center'><strong>{a.tempsReponse}</strong></td>
                      
                      <td style={{textAlign: 'center'}}>
                        {minTemps.map((t) =>(
                            a.tempsReponse < t ? (<i className='fas fa-check' style={{color:'green'}}></i> ) : ( <i className='fas fa-times' style={{color: 'red'}}></i>  )))}
                    </td>
                    </tr>
                    
            )))   } 
                </tbody>
              </Table> 
             
        )}
        
        </>
    )
}

export default ResultQuestion
