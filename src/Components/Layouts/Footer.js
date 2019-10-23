import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Paper, Tabs, Tab } from '@material-ui/core';

const Footer = (props) => {
  
  const [tab, setTab] = useState(0);

  const setMuscle = (muscle, tabIndex) => {
    setTab(tabIndex);
    props.setSpecificExercises(muscle);
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
  }
}

const mapDispatchToProps = () => {
  return {
  }
}

export default Footer;