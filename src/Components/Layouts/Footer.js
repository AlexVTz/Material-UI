import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Paper, Tabs, Tab } from '@material-ui/core';
import { setExercises, setSelectedExercises } from '../../redux/actions/rootActions'

const Footer = (props) => {
  
  const [tab, setTab] = useState(0);

  const setMuscle = (muscle, tabIndex) => {
    setTab(tabIndex);
    setSpecificExercises(muscle);
  }

  const setSpecificExercises = (muscle) => {
    if(muscle === 'all')
        setExercises(props.total)
    else {
        let filteredExercises = {...props.total};
        let specificMuscle = {};
        for (let exercise in filteredExercises){
            if(exercise === muscle){
                specificMuscle[exercise] = filteredExercises[exercise];
                break;
            }
        }
        setSelectedExercises(specificMuscle);
    }
}

  return (
    <Paper>
      <Tabs
        value ={tab}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="All" onClick={() => setMuscle('all', 0)}/>
        {
          props.muscles.map((muscle, i) => {
            return <Tab onClick={() => setMuscle(muscle, i+1)} key={`Tab${i}`} label={muscle} />
          })
        }
      </Tabs>
    </Paper>
  );
}

const mapStateToProps = function(state) {
  return {
    total: state.total,
    muscles: state.muscles
  }
}

const mapDispatchToProps = () => {
  return {
    setExercises,
    setSelectedExercises
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);