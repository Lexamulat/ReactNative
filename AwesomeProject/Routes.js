import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import SecondScreen from './components/SecondScreen/SecondScreen'
import StartScreen from './components/StartScreen/StartScreen'

export default function Routes() {

   return (
      <Router>
         <Scene key="root">

            <Scene key="home" component={StartScreen} title="Home" initial={true} />
            <Scene key="tab" component={SecondScreen} title="Calculator"  initial={true}/>

         </Scene>
      </Router>
   );
}