import React from 'react'
import {Card,CardContent,Typography} from '@material-ui/core';
function InfoBox({title,cases,total,...props}) {
    //console.log("propsss",props);
    return (
        <Card onClick={props.onClick} className="infoBox">
            <CardContent>
                <Typography className="infoBox_title"color="textSecoundry">
                    {title}
                </Typography>
                <h2 className="infoBox_cases">
                    Today {cases} {title}
                </h2>
                <Typography className="infoBox_total" color="textSecoundry">
                    Total {total} {title} 
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
