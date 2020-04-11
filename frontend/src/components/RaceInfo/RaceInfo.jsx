import React from 'react'
import PropTypes from 'prop-types';
//import styles from './VerticalNavigationalBar.scss';
import RaceStore from '../../stores/Race.jsx';
//import CoursesStore from '../../stores/Courses.jsx';

import Info from '../Info/Info.jsx';

import { observer } from 'mobx-react';

@observer
class RaceInfo extends React.Component {
    constructor(props) {
        super(props);
    }
    render(props, state) {
        let {code} = this.props;
        let race = RaceStore.getRaceByCode(code);
        // к сожалению, необходимо держать эту строчку, для переасчёта
        var isLoadRace = RaceStore.isLoadRaces;
        let locations = RaceStore.getLocationsByRace(code);
        var isLoadLocation = RaceStore.isLoadLocation;
        return ( 
            <div>               
                <div>{isLoadRace && race && race.name}</div>
                <div>{isLoadRace && race && race.description}</div>
                {
                    locations.map (location => 
                        <Info 
                            title = {location.name} 
                            text = {location.description} 
                            key = {location.code} 
                            code = {location.code}
                            type = 'location'/>)
                }
            </div>
        )
    }
}
RaceInfo.propTypes = {   
    code: PropTypes.string
};
export default RaceInfo;