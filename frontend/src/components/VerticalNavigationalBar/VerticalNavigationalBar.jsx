import React from 'react'
import PropTypes from 'prop-types';
import styles from './VerticalNavigationalBar.scss';


import RaceStore from '../../stores/Race.jsx';
import { observer } from 'mobx-react';

import MenuRecord from './MenuRecord.jsx';

var urlServer = MODE_NAME == "development" ? 'http://localhost:8080' : '';

@observer
class VerticalNavigationalBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render(props, state) {
        let {raceCurrentCode} = this.props;
        var races = RaceStore.races;
        var isLoad = RaceStore.isLoadLocation;
        return ( 
            <div>               
                <div>
                    {races.map(race => 
                        <MenuRecord 
                            key = {race.code} 
                            name = {race.name} 
                            link = {`${urlServer}/race/${race.code}`}
                            records = {RaceStore.getLocationsByRace(race.code)} 
                            defaultStateOpen = {raceCurrentCode && raceCurrentCode === race.code}/>                
                    )}
                </div>
            </div>
        )
    }
}
VerticalNavigationalBar.propTypes = {
    raceCurrentCode: PropTypes.string
};
export default VerticalNavigationalBar;